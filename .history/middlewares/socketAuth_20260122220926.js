//purpose - verify JWT from cookie, attach socket.data.role else guest.role
//and unlike http no recurring requests so 
//this runs before the socket connection is established just once
const cookie = require("cookie");
const jwt = require('jsonwebtoken');

module.exports = function(socket,next){
    try{
        const headerCookie = socket.request.headers.cookie;
        if(!headerCookie){
            socket.data.role = "guest";
            return next();
        }

    }

}