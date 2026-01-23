const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require("dotenv").config(); 

const connectdb = require('./config/mongoose-connection');
connectdb();
const indexRouter = require('./routes/indexRouter');
const customerRouter = require('./routes/customerRouter');
const agentRouter = require('./routes/agentRouter');

//socket io 
const {Server} = require("socket.io");
const http = require('http');
const socketAuth = require('./middlewares/socketAuth');
const server = http.createServer(app);
const io = new Server(server);
const socketAuth = require('./middlewares/socketAuth');


app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(cookieParser());

app.use('/',indexRouter);
// app.use('/customer',customerRouter);
app.use('/agent',agentRouter);

//socket.io

//middleware
io.use(socketAuth);
io.on("connection", (socket)=>{
    console.log("role", socket.data.role);
});

app.listen(3000,()=>{
    console.log("Server running at localhost:3000");
})

