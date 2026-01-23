const jwt = require('jsonwebtoken');
const agentModel = require('../models/agent');

module.exports =async function(req,res,next){
    if(!req.cookies.aid){
        console.log(`Not authorized`);
        return res.redirect('/agent/login');
    }

    try{
        const decoded = jwt.verify(req.cookies.aid, process.env.JWT_KEY);
        let agent = await agentModel
        .findOne({email : decoded.email})
        .select("-passwordHash");

        req.agent = agent; //hooking info with this middleware
        next();
    }catch(err){
        console.log("Middleware issue");
        return res.redirect("/agent/login");
    }
}