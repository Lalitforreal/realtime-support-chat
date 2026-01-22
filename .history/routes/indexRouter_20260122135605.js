const express = require("express");
const router = express.Router();

router.get('/',function(req,res){
    console.log("hey");
});

module.exports = router;