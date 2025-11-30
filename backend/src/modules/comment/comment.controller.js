const service = require("./comment.service");

exports.createComment = async (req, res) => {
  try {
    const { ticketId, content } = req.body;
    const userId = req.user.id;

    const data = await service.createComment(userId, ticketId, content);

    // Emit websocket
    req.io.to(`ticket_${ticketId}`).emit("new_comment", data);

    res.json({ status: "success", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const ticketId = Number(req.params.ticketId);
    const comments = await service.getComments(ticketId);

    res.json({ status: "success", comments });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
