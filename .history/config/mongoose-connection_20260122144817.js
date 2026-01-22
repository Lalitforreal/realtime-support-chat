const mongoose = require("mongoose");

const config = require('config');


async function connectdb(){
    try{
        const mongoUrl = process.env.MONGODB_URL;

        if(!mongoUrl){
            throw new Error("MONGODB url missing in .env");
    
        }
        await mongoose.connect(`${process.env.MONGODB_URL}/realtime-support-chat`)
            .then(function(){
                console.log("MongoDB connected");
            });
        }catch(err){
            console.log("MongoDB error:",err);
            
    }
};

module.exports = connectdb;