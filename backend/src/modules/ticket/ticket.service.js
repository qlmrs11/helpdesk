// backend/src/modules/ticket/ticket.service.js
const prisma = require("../../config/prisma");

// CREATE TICKET
exports.createTicket = async (userId, body) => {
  const ticket = await prisma.ticket.create({
    data: {
      title: body.title,
      description: body.description,
      category: body.category,
      priority: body.priority,
      createdById: userId,
      status: 'PENDING'
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
  
  return ticket;
};

// GET USER TICKETS
exports.getUserTickets = async (userId) => {
  const tickets = await prisma.ticket.findMany({
    where: { createdById: userId },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          department: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  return tickets;
};

// GET HELPER TICKETS
exports.getHelperTickets = async (department) => {
  const tickets = await prisma.ticket.findMany({
    where: { category: department },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          department: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  return tickets;
};

// GET TICKET BY ID
exports.getTicketById = async (ticketId) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          department: true
        }
      }
    }
  });
  
  return ticket;
};

// ASSIGN TICKET
exports.assignTicket = async (ticketId, helperId) => {
  const ticket = await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      assignedToId: helperId,
      status: 'IN_PROGRESS'
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          department: true
        }
      }
    }
  });
  
  return ticket;
};

// UPDATE STATUS
exports.updateStatus = async (ticketId, newStatus) => {
  const ticket = await prisma.ticket.update({
    where: { id: ticketId },
    data: { status: newStatus },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          department: true
        }
      }
    }
  });
  
  return ticket;
};

// CONFIRM RESOLVED
exports.confirmResolved = async (ticketId) => {
  const ticket = await prisma.ticket.update({
    where: { id: ticketId },
    data: { status: 'RESOLVED' },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
          department: true
        }
      }
    }
  });
  
  return ticket;
};