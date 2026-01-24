

module.exports = function registerSockets(io){
    //step 1 
    io.on("connection", (socket)=>{
        console.log("role", socket.data.role);
        //step 2 - client connects to socket
        //step 3- join ticket room (1 ticket = 1 room) so client emits and catch here

        socket.on("ticket:join",({tickedId})=>{
            socket.join(`ticket/${tickedId}`);
            console.log("joined room", tickedId);
        })
    });

}
