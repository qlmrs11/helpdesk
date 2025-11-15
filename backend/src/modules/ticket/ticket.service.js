const prisma = require("../../config/prisma");

exports.createTicket = async (data, userId) => {
  const ticket = await prisma.ticket.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
      createdById: userId,
    }
  });

  return ticket;
};
