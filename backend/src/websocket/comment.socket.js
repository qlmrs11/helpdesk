const prisma = require("../config/prisma"); // IMPORT PRISMA

function registerCommentSocket(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join Room Ticket
    socket.on("join_ticket", (ticketId) => {
      socket.join(`ticket_${ticketId}`);
      console.log(`User join room ticket_${ticketId}`);
    });

    // SEND COMMENT (disimpan ke database)
    socket.on("send_comment", async (data) => {
      try {
        const { ticketId, userId, content } = data;

        // Simpan ke DB
        const saved = await prisma.comment.create({
          data: {
            ticketId,
            userId,
            content,
          },
          include: {
            user: true,
          }
        });

        console.log("COMMENT SAVED:", saved);

        // Broadcast ke semua user yang join ticket tersebut
        io.to(`ticket_${ticketId}`).emit("new_comment", saved);

      } catch (err) {
        console.error("Error saving comment:", err);
        socket.emit("error_comment", "Gagal menyimpan komentar");
      }
    });
  });
}

module.exports = registerCommentSocket;
