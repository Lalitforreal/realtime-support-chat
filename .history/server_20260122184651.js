const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
require("dotenv").config(); 

const connectdb = require('./config/mongoose-connection');
connectdb();
const indexRouter = require('./routes/indexRouter');
const customerRouter = require('./routes/customerRouter');
const agentRouter = require('./routes/agentRouter');

app.use(express.urlencoded({extended : true}));
app.use(express.json());ˀ
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use('/',indexRouter);
// app.use('/customer',customerRouter);
app.use('/agent',agentRouter);

app.listen(3000,()=>{
    console.log("Server running at localhost:3000");
})

