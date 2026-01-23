const express = require('express');
const router = require("router");

router.get('/new',function(req,res){
    res.send("customer side laadle");
})