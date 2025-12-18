// backend/src/modules/notification/notification.controller.js
const service = require("./notification.service");

// GET /api/notification - Get user notifications
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await service.getUserNotifications(userId);

    res.json({ 
      status: "success", 
      data: notifications 
    });
  } catch (err) {
    console.error("Error get notifications:", err);
    res.status(400).json({ 
      status: "error", 
      message: err.message 
    });
  }
};

// GET /api/notification/unread-count - Get unread count
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await service.getUnreadCount(userId);

    res.json({ 
      status: "success", 
      data: { count } 
    });
  } catch (err) {
    console.error("Error get unread count:", err);
    res.status(400).json({ 
      status: "error", 
      message: err.message 
    });
  }
};

// PATCH /api/notification/:id/read - Mark as read
exports.markAsRead = async (req, res) => {
  try {
    const notificationId = parseInt(req.params.id);
    await service.markAsRead(notificationId);

    res.json({ 
      status: "success", 
      message: "Notification marked as read" 
    });
  } catch (err) {
    console.error("Error mark as read:", err);
    res.status(400).json({ 
      status: "error", 
      message: err.message 
    });
  }
};

// PATCH /api/notification/read-all - Mark all as read
exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    await service.markAllAsRead(userId);

    res.json({ 
      status: "success", 
      message: "All notifications marked as read" 
    });
  } catch (err) {
    console.error("Error mark all as read:", err);
    res.status(400).json({ 
      status: "error", 
      message: err.message 
    });
  }
};