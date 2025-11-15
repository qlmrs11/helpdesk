const prisma = require("../../config/prisma");

// GET ALL COMMENTS OF A TICKET
exports.getComments = async (ticketId) => {
  return await prisma.comment.findMany({
    where: { ticketId: Number(ticketId) },
    include: {
      user: { select: { id: true, name: true, role: true } }
    },
    orderBy: { createdAt: "asc" }
  });
};

// CREATE COMMENT
exports.createComment = async (ticketId, userId, message) => {
  // Validasi ticket
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number(ticketId) }
  });
  if (!ticket) throw new Error("Ticket tidak ditemukan");

  // Semua user yang punya akses dapat memberi komentar:
  // User pemilik ticket, helper assigned, atau admin
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (ticket.userId !== userId && ticket.helperId !== userId && user.role !== "ADMIN") {
    throw new Error("Anda tidak memiliki akses memberi komentar");
  }

  return await prisma.comment.create({
    data: {
      message: message,
      ticketId: Number(ticketId),
      userId: userId,
    },
    include: {
      user: { select: { id: true, name: true, role: true } }
    }
  });
};
