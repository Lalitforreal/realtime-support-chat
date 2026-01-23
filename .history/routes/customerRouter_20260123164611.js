const express = require('express');
const router = express.Router();
const ticketModel = require('../models/ticket');

router.get('/new',function(req,res){
    res.render("customer");
})

router.post("/ticket",function(req,res){

})
module.exports = router;