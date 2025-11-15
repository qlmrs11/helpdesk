const ticketService = require("./ticket.service");
const { sendResponse } = require("../../utils/response");

exports.create = async (req, res) => {
  try {
    const userId = req.user.id; // dari token
    const result = await ticketService.createTicket(req.body, userId);

    sendResponse(res, 201, "Ticket berhasil dibuat", result);
  } catch (err) {
    sendResponse(res, 400, err.message);
  }
};
