const express = require("express");
const router = express.Router();
const bcrypt= require('bcrypt');
const crypto = require('crypto'); // forgot password usage
const agentModel = require('../models/agent');
const { generateToken } = require("../utils/generateToken");
console.log("generateToken:", generateToken);

router.get('/login',function(req,res){
    res.render("index");
})

router.post("/register",function(req,res){
    let{name,email,password} = req.body;
    bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(password,salt,async function(err,hash){
            let agent = await agentModel.findOne({email});
            
            if(agent){
                console.log("Admin already exists");
                return res.redirect('/agent/login'); //you ahve to return orelse app will crash
            }
            console.log(hash);
            try{
                const newAgent = await agentModel.create({
                    name,
                    email,
                    passwordHash: hash,
                    role : "agent"
                });
                //use JWT to generate a token in the utils
                let token = generateToken(newAgent);
                res.cookie("aid", token);
                // res.redirect('/agent/dashboard');
                console.log("Agent Registered");
            }catch(err){
                console.log(err);
                return res.redirect("/agent/login");
            };
        });
    });

})


router.post("/login",async function(req,res){
    let {email,password} = req.body;
    try{
        const agent = await agentModel.findOne({email});
        if(!agent){
            console.log("Invalid credentials");
            return res.redirect('/agent/login');
        }
        let isMatch = await bcrypt.compare(req.body.password, agent.passwordHash);

        console.log("login by", {email, isMatch});
        if(isMatch){
            // return res.redirect('/agent/dashboard');
            console.log("agent logged in");
            //generate token
            const token = generateToken(agent);
            res.cookie("loginaid",token,{
                httpOnly : true, //protects from token chori by XSS
                sameSite : "lax", //allows redirect to keep cookei
                secure : false, //F in localhost T in production
            });

            console.log(token);
            // return res.redirect("agent/dashboard");
        }else{
            console.log("Invalid credentials");
            // return res.redirect("/agent/login");
        }

    }catch(err){

    }

})


module.exports = router;