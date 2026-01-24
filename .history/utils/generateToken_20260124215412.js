const jwt = require('jsonwebtoken');

const generateToken = function(user){
    return jwt.sign({
        name : user.fullname,
        email : user.email,
        id : user._id,
        role : user.role
        },
         process.env.JWT_KEY,
        {expiresIn : "1d"}
    );
};

module.exports = {generateToken};