const Message = require('../models/message');
const Ticket = require('../models/ticket');

module.exports = function registerSockets(io){
    //step 1 
    io.on("connection", (socket)=>{
        console.log("role", socket.data.role);
        //step 2 - client connects to socket
        //step 3- join ticket room (1 ticket = 1 room) so client emits and catch here

        socket.on("ticket:join", ({ ticketId }) => {
            if (!ticketId) {
                console.log("ticketId missing in join");
                return;
            }

            socket.join(`ticket:${ticketId}`);
            console.log("joined room", ticketId);
        });

        socket.on("chat:message",async ({ticketId,msg})=>{
            if(!msg) return;

            const ticket = await Ticket.findById(ticketId);
            if(!ticket || ticket.status === "closed") return;
              // ownership check
            if (
                socket.data.role === "guest" &&
                ticket.guestId !== socket.data.guestId
            ) return;

            //save to DB first
            const saved = await Message.create({
                ticketId,
                senderRole : "guest",
                senderName : "Guest",
                content : msg
            });
            console.log("saved to DB", saved);

            //emit after saved
            io.to(`ticket:${ticketId}`).emit("chat:message", {
                ticketId,
                msg: saved.content,
                senderRole: saved.senderRole
            });
        });
    });

}
