const jwt = require('jsonwebtoken');

const generateToken = function(user){
    jwt.sign({email : user.email, id : user._id, role : user.role}, process.env.JWT_KEY);
};

module.exports.generateToken = generateToken;