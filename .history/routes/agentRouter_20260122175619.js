const express = require("express");
const router = express.Router();
const bcrypt= require('bcrypt');
const crypto = require('crypto'); // forgot password usage
const agentModel = require('../models/agent');
const { generateToken } = require("../utils/generateToken");


router.get('/login',function(req,res){
    res.render("index");
})

router.post("/register",function(req,res){
    let{name,email,password} = req.body;
    bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(password,salt,async function(err,hash){
            let agent = await agentModel.findOne({email});
            let passwordHash = hash;
            console.log(hash);
            if(agent){
                res.redirect('/agent/login');
                console.log("Admin already exists");
            }
            try{
                const newAgent = await agentModel.create({
                    name,
                    email,
                    passwordHash
                });
                //use JWT to generate a token in the utils
                let token = generateToken(newAgent);
                res.cookie("aid", token);
                // res.redirect('/agent/dashboard');
                console.log("Agent Registered");
            }catch(err){
                res.redirect("/agent/login");
                console.log(err);
            };
        });
    });

})


router.post("/login",function(req,res){
    let {email,password} = req.body;

})


module.exports = router;