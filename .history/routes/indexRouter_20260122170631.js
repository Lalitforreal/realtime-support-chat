const express = require("express");
const router = express.Router();

router.get('/',function(req,res){
    

});


router.get('/agent/login',function(req,res){
    res.render("index");
})

module.exports = router;