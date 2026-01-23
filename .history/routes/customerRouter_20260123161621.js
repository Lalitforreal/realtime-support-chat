const express = require('express');
const router = express.Router();

router.get('/new',function(req,res){
    res.send("customer side laadle");
})


module.exports = router;