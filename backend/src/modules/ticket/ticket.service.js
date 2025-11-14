// src/modules/ticket/ticket.service.js
const prisma = require("../../config/prisma");

// CREATE TICKET
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

// GET ALL TICKETS
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

// GET TICKET BY ID
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

  if (user.role === "USER" && ticket.createdById !== user.id) {
    throw new Error("Anda tidak boleh melihat tiket ini");
  }

  if (user.role === "HELPER" && ticket.category !== user.department) {
    throw new Error(
      `Tiket kategori ${ticket.category} tidak sesuai department anda (${user.department})`
    );
  }

  return ticket;
};

// ASSIGN TICKET (HELPER only)
exports.assignTicket = async (ticketId, user) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) throw new Error("Ticket tidak ditemukan");

  if (ticket.category !== user.department) {
    throw new Error("Anda tidak bisa meng-assign tiket kategori lain");
  }

  if (ticket.assignedToId && ticket.assignedToId !== user.id) {
    throw new Error("Tiket sudah ditangani helper lain");
  }

  return await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      assignedToId: user.id,
      status: "IN_PROGRESS",
    },
  });
};

// UPDATE STATUS TICKET (HELPER only)
exports.updateStatus = async (ticketId, newStatus, user) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) throw new Error("Ticket tidak ditemukan");

  if (ticket.assignedToId !== user.id) {
    throw new Error("Anda bukan helper yang menangani tiket ini");
  }

  const validStatus = ["IN_PROGRESS", "WAITING_USER", "DONE"];
  if (!validStatus.includes(newStatus)) {
    throw new Error("Status tidak valid");
  }

  return await prisma.ticket.update({
    where: { id: ticketId },
    data: { status: newStatus },
  });
};

// USER CONFIRM (ONLY OWNER)
exports.confirmTicket = async (ticketId, user) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) throw new Error("Ticket tidak ditemukan");

  if (ticket.createdById !== user.id) {
    throw new Error("Anda tidak boleh mengkonfirmasi tiket ini");
  }

  if (ticket.status !== "DONE") {
    throw new Error("Tiket belum selesai, tidak bisa dikonfirmasi");
  }

  return await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: "RESOLVED", 
    },
  });
};
