const jwt = require('jsonwebtoken');

const generateToken = function(user){
    return jwt.sign({
        name : user.name,
        email : user.email,
        id : user._id,
        role : user.role
        },
         process.env.JWT_KEY,
        {expiresIn : "1d"}
    );
};

module.exports = {generateToken};