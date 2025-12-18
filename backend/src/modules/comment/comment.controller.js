// backend/src/modules/comment/comment.controller.js
const service = require("./comment.service");

exports.createComment = async (req, res) => {
  try {
    const { ticketId, text } = req.body;
    const userId = req.user.id;

    const data = await service.createComment(userId, ticketId, text);

    // Emit websocket ke semua user di room ticket ini
    req.io.to(`ticket_${ticketId}`).emit("new_comment", data);

    res.json({ status: "success", data });
  } catch (err) {
    console.error("Error create comment:", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const ticketId = Number(req.params.ticketId);
    const data = await service.getComments(ticketId);
    res.json({ status: "success", data });
  } catch (err) {
    console.error("Error get comments:", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};