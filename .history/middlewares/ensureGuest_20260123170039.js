const crypto = require("crypto");

module.exports = function ensureGuest(req,res,next){
    if(!req.cookies.guestId){
        const guestId = crypto.randomBytes(16).toString("hex");
        res.cookie("guestId",guestId,{
            httpOnly : true,
            sameSite : "lax",
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        });
        req.cookies.guestId = guestId; //so the req can use it whererver middleware is used
    }
    next();
}

