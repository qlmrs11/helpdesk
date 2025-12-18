// backend/src/modules/comment/comment.router.js
const router = require("express").Router();
const controller = require("./comment.controller");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.post("/", authMiddleware, controller.createComment);
router.get("/:ticketId", authMiddleware, controller.getComments);

module.exports = router;