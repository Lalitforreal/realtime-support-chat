const mongoose = require("mongoose");

const config = require('config');

const connectdb = mongoose.connect(`${config.get("MONGODB_URL")}/realtime-support-chat`)
.catch(function(err){
    console.log(err);
});

module.exports = connectdb;