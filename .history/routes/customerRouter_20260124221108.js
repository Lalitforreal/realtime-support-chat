const express = require('express');
const router = express.Router();
const ticketModel = require('../models/ticket');
const messageModel = require('../models/message');
const ensureGuest = require("../middlewares/ensureGuest");


router.get('/new',async function(req,res){
    //if already has a ticket
    const guestId = req.cookies.guestId;
    const openTicket = await ticketModel.findOne({
        guestId,
        status : 'open'
    });
    if(openTicket){
        return res.redirect(`/customer/ticket/${openTicket._id}`);
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
    return res.redirect(`/customer/ticket/${ticket._id}`); //mongo gives direclty
});

router.get('/ticket/:ticketId', async function(req,res){
    console.log(req.params.ticketId);
    const ticket = await ticketModel.findById(req.params.ticketId);
    if(!ticket){
        return res.status(400).send("Ticket not found");
    }

    //ownership security 
    if(ticket.guestId !== req.cookies.guestId){
        return res.status(403).send("Not allowed");
    }
    // res.send("chat khulgayiii");
    //render old messages
    // const messages = await messageModel.findOne({
    //     ticketId : req.params.ticketId,
    // }).sort({createdAt : 1});
    res.render("chat",{ticket});
})

module.exports = router;