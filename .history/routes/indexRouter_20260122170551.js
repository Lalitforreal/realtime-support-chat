const express = require("express");
const router = express.Router();

router.get('/',function(req,res){
    res.render("index");

});


router.get('/agent/login',function(req,res){
    
})

module.exports = router;