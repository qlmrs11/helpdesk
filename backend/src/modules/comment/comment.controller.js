const service = require("./comment.service");
const { sendNotification } = require("../../grpc/notificationClient");
const prisma = require("../../config/prisma");

exports.createComment = async (req, res) => {
  try {
    const { ticketId, text } = req.body;
    const userId = req.user.id;

    const data = await service.createComment(userId, ticketId, text);

    // Emit websocket ke semua user di room ticket ini
    req.io.to(`ticket_${ticketId}`).emit("new_comment", data);

    // 📨 KIRIM NOTIFIKASI (kecuali ke diri sendiri)
    try {
      const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        select: {
          createdById: true,
          assignedToId: true,
          title: true
        }
      });

      const commentPreview = text.length > 50 
        ? `${text.substring(0, 50)}...` 
        : text;

      // Kirim ke user (jika yang comment adalah helper)
      if (req.user.role === 'HELPER' && ticket.createdById !== userId) {
        await sendNotification({
          userId: ticket.createdById,
          type: 'COMMENT_ADDED',
          title: '💬 Komentar Baru dari Helper',
          message: `${req.user.name}: ${commentPreview}`,
          ticketId: ticketId,
          metadata: JSON.stringify({
            commentBy: req.user.name,
            role: req.user.role
          })
        });
      }

      // Kirim ke helper (jika yang comment adalah user)
      if (req.user.role === 'USER' && ticket.assignedToId && ticket.assignedToId !== userId) {
        await sendNotification({
          userId: ticket.assignedToId,
          type: 'COMMENT_ADDED',
          title: '💬 Komentar Baru dari User',
          message: `${req.user.name}: ${commentPreview}`,
          ticketId: ticketId,
          metadata: JSON.stringify({
            commentBy: req.user.name,
            role: req.user.role
          })
        });
      }

      console.log(`✅ Notifikasi comment dikirim`);
    } catch (notifError) {
      console.error('⚠️ Error sending notification:', notifError.message);
    }

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