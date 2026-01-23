const express = require('express');
const router = express.Router();
const ticketModel = require('../models/ticket');
const ensureGuest = require("../middlewares/ensureGuest");


router.get('/new',async function(req,res){
    //if already has a ticket
    const guestId = req.cookies.guestId;
    const openTicket = await ticketModel.findOne({
        guestId,
        status : 'open'
    });
    if(openTicket){
        return res.send("Ticket exists, welcome to chat");
    }
    res.render("customer");
})

//now for teh guest cookei you create a middleware
router.post("/ticket",ensureGuest,async function(req,res){
    const {name, email, issue} = req.body;
    const ticket = await ticketModel.create({
        guestId : req.cookies.guestId,
        customerName : name,
        email,
        issue
    });
    return res.send("created ticket");
});

//waht if already have a ticket


module.exports = router;