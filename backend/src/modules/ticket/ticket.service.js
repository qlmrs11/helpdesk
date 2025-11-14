// pathnya src/modules/ticket/ticket.service.js
const prisma = require("../../config/prisma");

// Create ticket
exports.createTicket = async (userId, body) => {
  return await prisma.ticket.create({
    data: {
      title: body.title,
      description: body.description,
      category: body.category,
      priority: body.priority,
      createdById: userId,
    },
  });
};

// Get tickets (role-based)
exports.getTickets = async (user) => {
  let filter = {};

  if (user.role === "USER") {
    filter = { createdById: user.id };
  }

  if (user.role === "HELPER") {
    filter = { category: user.department };
  }

  return await prisma.ticket.findMany({
    where: filter,
    include: {
      createdBy: true,
      assignedTo: true,
      comments: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// Get ticket by ID
exports.getTicketById = async (id, user) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      createdBy: true,
      assignedTo: true,
      comments: true,
    },
  });

  if (!ticket) throw new Error("Ticket tidak ditemukan");

  // USER hanya boleh melihat tiketnya
  if (user.role === "USER" && ticket.createdById !== user.id) {
    throw new Error("Anda tidak boleh melihat tiket ini");
  }

  // HELPER hanya boleh melihat tiket sesuai department
  if (user.role === "HELPER") {
    if (!user.department) throw new Error("Departemen helper tidak terdaftar");

    if (ticket.category !== user.department) {
      throw new Error(
        `Tiket ini hanya untuk helper kategori ${ticket.category}, bukan ${user.department}`
      );
    }
  }

  return ticket;
};
