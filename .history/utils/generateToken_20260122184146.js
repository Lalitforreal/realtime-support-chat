const jwt = require('jsonwebtoken');

const generateToken = function(user){
    jwt.sign({
        email : user.email,
         id : user._id,
          role : user.role
        },
         process.env.JWT_KEY,
        {expiresIn : "1d"}
    );
};

module.exports.generateToken = {generateToken};