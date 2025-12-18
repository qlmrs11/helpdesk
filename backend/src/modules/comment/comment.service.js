// backend/src/modules/comment/comment.service.js
const prisma = require("../../config/prisma");

exports.createComment = async (userId, ticketId, text) => {
  const comment = await prisma.comment.create({
    data: {
      userId,
      ticketId,
      content: text, // ← GANTI dari 'text' ke 'content'
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return comment;
};

exports.getComments = async (ticketId) => {
  const comments = await prisma.comment.findMany({
    where: { ticketId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return comments;
};