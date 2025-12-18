// backend/src/modules/notification/notification.router.js
const router = require("express").Router();
const controller = require("./notification.controller");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.get("/", authMiddleware, controller.getNotifications);
router.get("/unread-count", authMiddleware, controller.getUnreadCount);
router.patch("/:id/read", authMiddleware, controller.markAsRead);
router.patch("/read-all", authMiddleware, controller.markAllAsRead);

module.exports = router;