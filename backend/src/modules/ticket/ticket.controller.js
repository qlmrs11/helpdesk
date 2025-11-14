// pathnya src/modules/ticket/ticket.controller.js
const service = require("./ticket.service");
//Bikin Ticket
exports.createTicket = async (req, res) => {
  try {
    const data = await service.createTicket(req.user.id, req.body);
    res.json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Ambil Semua Tickets
exports.getTickets = async (req, res) => {
  try {
    const data = await service.getTickets(req.user);
    res.json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Ambil Ticket By ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await service.getTicketById(
      Number(req.params.id),
      req.user
    );

    res.json({ status: "success", data: ticket });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

//Assign Ticket
exports.assignTicket = async (req, res) => {
  try {
    const data = await service.assignTicket(req.params.id, req.user);
    res.json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Update Ticket Status
exports.updateStatus = async (req, res) => {
  try {
    const data = await service.updateStatus(
      req.params.id,
      req.body.status,
      req.user
    );
    res.json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
