const express = require('express');
const app = express();
const path = require('path');

const indexRouter = require('./routes/indexRouter');
const customerRouter = require('./routes/customerRouter');
const agentRouter = require('./routes/agentRouter');

app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));ˀ
app.set("view engine","ejs");

app.use('/',indexRouter);
app.use('/customer',customerRouter);
app.use('/agent',agentRouter);

app.listen(3000,()=>{
    console.log("Server running at localhost:3000");
})

