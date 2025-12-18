// backend/src/websocket/comment.socket.js
const prisma = require("../config/prisma");

function registerCommentSocket(io) {
  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // Join Room Ticket
    socket.on("join_ticket", (ticketId) => {
      socket.join(`ticket_${ticketId}`);
      console.log(`👤 User ${socket.id} join room ticket_${ticketId}`);
    });

    // Leave Room
    socket.on("leave_ticket", (ticketId) => {
      socket.leave(`ticket_${ticketId}`);
      console.log(`🚪 User ${socket.id} leave room ticket_${ticketId}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
}

module.exports = registerCommentSocket;