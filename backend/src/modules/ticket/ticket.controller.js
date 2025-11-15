// src/modules/ticket/ticket.controller.js
const service = require("./ticket.service");

// Create Ticket (USER only)
exports.createTicket = async (req, res) => {
  try {
    const data = await service.createTicket(req.user.id, req.body);
    res.json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Tickets
exports.getTickets = async (req, res) => {
  try {
    const data = await service.getTickets(req.user);
    res.json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Ticket By ID
exports.getTicketById = async (req, res) => {
  try {
    const data = await service.getTicketById(Number(req.params.id), req.user);
    res.json({ status: "success", data });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

// Assign Ticket (HELPER only)
exports.assignTicket = async (req, res) => {
  try {
    const data = await service.assignTicket(Number(req.params.id), req.user);
    res.json({ status: "success", message: "Ticket berhasil di-assign", data });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

// Update Status Ticket (HELPER only)
exports.updateStatus = async (req, res) => {
  try {
    const data = await service.updateStatus(
      Number(req.params.id),
      req.body.status,
      req.user
    );
    res.json({ status: "success", message: "Status diperbarui", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Confirm Ticket (USER only)
exports.confirmTicket = async (req, res) => {
  try {
    const data = await service.confirmTicket(Number(req.params.id), req.user);
    res.json({
      status: "success",
      message: "Ticket berhasil dikonfirmasi",
      data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
