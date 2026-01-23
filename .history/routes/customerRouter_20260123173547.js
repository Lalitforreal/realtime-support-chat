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
    // return res.send("created ticket");
    return res.redirect(`/ticket/${ticket._id}`); //mongo gives direclty
});

router.get('/ticket/:ticketId', async function(req,res){
    console.log(req.params.ticketId);
    const ticket = await ticketModel.findById(req.params.ticketId);
    if(!ticket){
        return res.status(400).send("Ticket not found");
    }

    //ownership security 
    if(ticket.guestId !== req.params.guestId){
        return res.status(403).send("Not allowed");
    }
    res.send("caht khulgayiii");
    // res.render("chat")
})

module.exports = router;