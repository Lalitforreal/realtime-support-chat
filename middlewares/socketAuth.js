//purpose - verify JWT from cookie, attach socket.data.role else guest.role
//and unlike http no recurring requests so 
//this runs before the socket connection is established just once
const cookie = require("cookie");
const jwt = require('jsonwebtoken');

module.exports = function socketAuth(socket,next){
    try{
        const headerCookie = socket.request.headers.cookie;
        if(!headerCookie){
            socket.data.role = "guest";
            return next();
        }
        //parse all cookies correctly 
        const cookies = cookie.parse(headerCookie);
        //pick token cookie
        const token = cookies.aid;

        //no token -> guest
        if(!token){
            socket.data.role = "guest";
            socket.data.guestId = cookies.guestId || null;
            return next();
        }

        //verify 
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        socket.data.userId = decoded.id;
        socket.data.role = decoded.role;
        socket.data.name = decoded.name;
        return next();

    }catch(err){
        return next(new Error("Unauthorized socket"));
    }

}