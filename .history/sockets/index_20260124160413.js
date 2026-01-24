
const http = require("http");
const {Server} = require("socket.io");

const server = http.createServer(app)

module.exports = function registerSockets(io){
    
    io.on("connection", (socket)=>{
        console.log("role", socket.data.role);
    });
}
