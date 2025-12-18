//backend/src/modules/ticket/ticket.service.js
const prisma = require("../../config/prisma");

// CREATE TICKET - Status awal PENDING
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

// GET ALL TICKETS - Filter by role
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
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      comments: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// GET TICKET BY ID - Cek permission
exports.getTicketById = async (id, user) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      comments: {
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
        orderBy: {
          createdAt: "asc",
        },
      },
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

// ASSIGN TICKET - PENDING -> IN_PROGRESS
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

  if (ticket.status !== "PENDING") {
    throw new Error("Tiket sudah di-assign");
  }

  return await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      assignedToId: user.id,
      status: "IN_PROGRESS",
    },
  });
};

// UPDATE STATUS - Helper only
exports.updateStatus = async (ticketId, newStatus, user) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) throw new Error("Ticket tidak ditemukan");

  if (ticket.assignedToId !== user.id) {
    throw new Error("Anda bukan helper yang menangani tiket ini");
  }

  if (ticket.status === "RESOLVED") {
    throw new Error("Tiket sudah resolved, tidak bisa diubah lagi");
  }

  const allowedTransitions = {
    IN_PROGRESS: ["DONE"],
    DONE: ["IN_PROGRESS", "WAITING_USER"],
    WAITING_USER: ["IN_PROGRESS"],
  };

  const allowed = allowedTransitions[ticket.status];
  
  if (!allowed || !allowed.includes(newStatus)) {
    throw new Error(
      `Tidak bisa ubah status dari ${ticket.status} ke ${newStatus}`
    );
  }

  return await prisma.ticket.update({
    where: { id: ticketId },
    data: { status: newStatus },
  });
};

// USER CONFIRM - WAITING_USER -> RESOLVED
exports.confirmTicket = async (ticketId, user) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) throw new Error("Ticket tidak ditemukan");

  if (ticket.createdById !== user.id) {
    throw new Error("Anda tidak boleh mengkonfirmasi tiket ini");
  }

  if (ticket.status !== "WAITING_USER") {
    throw new Error("Tiket belum di status WAITING_USER");
  }

  return await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: "RESOLVED", 
    },
  });
};