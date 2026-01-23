const express = require('express');
const router = express.router();

router.get('/new',function(req,res){
    res.send("customer side laadle");
})