
module.exports = function registerSockets(io){
    
    io.on("connection", (socket)=>{
        console.log("role", socket.data.role);
    });
}
