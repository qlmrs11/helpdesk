// backend/src/modules/ticket/ticket.controller.js
const service = require("./ticket.service");
const { sendNotification } = require("../../grpc/notificationClient");
const prisma = require("../../config/prisma");

// CREATE TICKET (USER)
exports.createTicket = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    const userId = req.user.id;

    const ticket = await service.createTicket(userId, {
      title,
      description,
      category,
      priority,
    });

    // 📨 KIRIM NOTIFIKASI KE SEMUA HELPER DENGAN DEPARTMENT YANG SAMA
    try {
      const helpers = await prisma.user.findMany({
        where: {
          role: "HELPER",
          department: category
        },
        select: { id: true, name: true }
      });

      for (const helper of helpers) {
        await sendNotification({
          userId: helper.id,
          type: 'TICKET_CREATED',
          title: `🆕 Ticket Baru [${category}]`,
          message: `${req.user.name} membuat ticket: "${title}"`,
          ticketId: ticket.id,
          metadata: JSON.stringify({ 
            priority,
            category,
            createdBy: req.user.name
          })
        });
      }

      console.log(`✅ Notifikasi ticket baru dikirim ke ${helpers.length} helper(s)`);
    } catch (notifError) {
      console.error('⚠️ Error sending notification:', notifError.message);
    }

    res.status(201).json({
      status: "success",
      message: "Ticket berhasil dibuat",
      data: ticket,
    });
  } catch (err) {
    console.error("Error creating ticket:", err);
    res.status(400).json({ 
      status: "error",
      message: err.message 
    });
  }
};

// GET USER TICKETS
exports.getUserTickets = async (req, res) => {
  try {
    const userId = req.user.id;
    const tickets = await service.getUserTickets(userId);

    res.json({
      status: "success",
      data: tickets,
    });
  } catch (err) {
    console.error("Error getting user tickets:", err);
    res.status(400).json({ 
      status: "error",
      message: err.message 
    });
  }
};

// GET HELPER TICKETS
exports.getHelperTickets = async (req, res) => {
  try {
    const department = req.user.department;
    const tickets = await service.getHelperTickets(department);

    res.json({
      status: "success",
      data: tickets,
    });
  } catch (err) {
    console.error("Error getting helper tickets:", err);
    res.status(400).json({ 
      status: "error",
      message: err.message 
    });
  }
};

// GET TICKET BY ID
exports.getTicketById = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket = await service.getTicketById(ticketId);

    if (!ticket) {
      return res.status(404).json({ 
        status: "error",
        message: "Ticket tidak ditemukan" 
      });
    }

    res.json({
      status: "success",
      data: ticket,
    });
  } catch (err) {
    console.error("Error getting ticket:", err);
    res.status(400).json({ 
      status: "error",
      message: err.message 
    });
  }
};

// ASSIGN TICKET (HELPER)
exports.assignTicket = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const helperId = req.user.id;

    const ticket = await service.assignTicket(ticketId, helperId);

    // 📨 KIRIM NOTIFIKASI KE USER YANG BUAT TICKET
    try {
      await sendNotification({
        userId: ticket.createdById,
        type: 'TICKET_ASSIGNED',
        title: '👤 Ticket Di-Assign',
        message: `${req.user.name} mengambil ticket: "${ticket.title}"`,
        ticketId: ticket.id,
        metadata: JSON.stringify({
          helperName: req.user.name,
          helperDepartment: req.user.department
        })
      });

      console.log(`✅ Notifikasi assign dikirim ke user ${ticket.createdById}`);
    } catch (notifError) {
      console.error('⚠️ Error sending notification:', notifError.message);
    }

    res.json({
      status: "success",
      message: "Ticket berhasil di-assign",
      data: ticket,
    });
  } catch (err) {
    console.error("Error assigning ticket:", err);
    res.status(400).json({ 
      status: "error",
      message: err.message 
    });
  }
};

// UPDATE STATUS (HELPER)
exports.updateStatus = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);
    const { status } = req.body;

    const ticket = await service.updateStatus(ticketId, status);

    // 📨 KIRIM NOTIFIKASI KE USER YANG BUAT TICKET
    try {
      const statusConfig = {
        'PENDING': {
          emoji: '⏳',
          title: 'Ticket Pending',
          message: `Ticket "${ticket.title}" menunggu diambil helper`
        },
        'IN_PROGRESS': {
          emoji: '🔄',
          title: 'Ticket Sedang Dikerjakan',
          message: `Helper sedang mengerjakan ticket "${ticket.title}"`
        },
        'WAITING_USER': {
          emoji: '⏸️',
          title: 'Menunggu Respons Anda',
          message: `Helper menunggu respons Anda untuk ticket "${ticket.title}"`
        },
        'DONE': {
          emoji: '✅',
          title: 'Ticket Selesai',
          message: `Ticket "${ticket.title}" sudah selesai dikerjakan. Silakan konfirmasi!`
        },
        'RESOLVED': {
          emoji: '🎉',
          title: 'Ticket Resolved',
          message: `Ticket "${ticket.title}" sudah ditutup`
        }
      };

      const config = statusConfig[status] || {
        emoji: '📊',
        title: 'Status Berubah',
        message: `Status ticket "${ticket.title}" berubah`
      };

      await sendNotification({
        userId: ticket.createdById,
        type: 'STATUS_UPDATED',
        title: `${config.emoji} ${config.title}`,
        message: config.message,
        ticketId: ticket.id,
        metadata: JSON.stringify({
          oldStatus: ticket.status,
          newStatus: status,
          updatedBy: req.user.name,
          updatedAt: new Date().toISOString()
        })
      });

      console.log(`✅ Notifikasi status ${status} dikirim ke user ${ticket.createdById}`);
    } catch (notifError) {
      console.error('⚠️ Error sending notification:', notifError.message);
    }

    res.json({
      status: "success",
      message: "Status berhasil diupdate",
      data: ticket,
    });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(400).json({ 
      status: "error",
      message: err.message 
    });
  }
};

// CONFIRM RESOLVED (USER)
exports.confirmResolved = async (req, res) => {
  try {
    const ticketId = parseInt(req.params.id);

    const ticket = await service.confirmResolved(ticketId);

    // 📨 KIRIM NOTIFIKASI KE HELPER
    try {
      if (ticket.assignedToId) {
        await sendNotification({
          userId: ticket.assignedToId,
          type: 'TICKET_RESOLVED',
          title: '🎉 Ticket Resolved',
          message: `${req.user.name} konfirmasi ticket "${ticket.title}" sudah selesai`,
          ticketId: ticket.id,
          metadata: JSON.stringify({
            resolvedBy: req.user.name,
            resolvedAt: new Date().toISOString()
          })
        });

        console.log(`✅ Notifikasi resolved dikirim ke helper ${ticket.assignedToId}`);
      }
    } catch (notifError) {
      console.error('⚠️ Error sending notification:', notifError.message);
    }

    res.json({
      status: "success",
      message: "Ticket berhasil di-resolve",
      data: ticket,
    });
  } catch (err) {
    console.error("Error confirming resolved:", err);
    res.status(400).json({ 
      status: "error",
      message: err.message 
    });
  }
};