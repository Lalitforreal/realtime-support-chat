const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require("dotenv").config(); 

const connectdb = require('./config/mongoose-connection');
const indexRouter = require('./routes/indexRouter');
const customerRouter = require('./routes/customerRouter');
const agentRouter = require('./routes/agentRouter');

//socket io 
const {Server} = require("socket.io");
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const socketAuth = require('./middlewares/socketAuth');
const registerSockets = require('./sockets');//add cors option later





app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(cookieParser());

app.use('/',indexRouter);
app.use('/customer',customerRouter);
app.use('/agent',agentRouter);

connectdb();


//socket.io
//middleware
io.use(socketAuth);

//register socket event handler 
registerSockets(io);



//for socket server
server.listen(3000,()=>{
    console.log("Server running at localhost:3000");
})

