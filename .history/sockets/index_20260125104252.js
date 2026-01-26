const Message = require('../models/message');
const Ticket = require('../models/ticket');

module.exports = function registerSockets(io){
    //step 1 
    io.on("connection", (socket)=>{

        //step 2 - client connects to socket
        //step 3- join ticket room (1 ticket = 1 room) so client emits and catch here

        socket.on("ticket:join", ({ ticketId }) => {
            if (!ticketId) {
                console.log("ticketId missing in join");
                return;
            }
            const room = `ticket:${ticketId}`;
            if (socket.rooms.has(room)) return; //refreshing page concerns

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

            console.log(socket.data.name);

            //save to DB first
            const saved = await Message.create({
                ticketId,
                senderRole : socket.data.role,
                senderName : socket.data.name,
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

        socket.on("ticket:close",async ({ticketId})=>{
            if(socket.data.role!=="agent") return;

            const ticket = await Ticket.findById(ticketId);
            if(!ticket)return;

            ticket.status = "closed";
            await ticket.save();
            const room = `ticket:${ticketId}`;
            io.to(room).emit("ticket:closed"); //broadcast
            
            socket.emit("agent:redirect", { url: "/agent/dashboard" });
            // io.in(room).socketsLeave(room);


        })
        socket.on("agent:leaving", ({ ticketId }) => {
            if (socket.data.role !== "agent") return;

            const room = `ticket:${ticketId}`;

            io.to(room).emit("system:message", {
                text: "Agent left the chat. Please wait..."
            });
        });

    });
}
