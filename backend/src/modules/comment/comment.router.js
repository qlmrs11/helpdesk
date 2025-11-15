const express = require("express");
const router = express.Router();
const controller = require("./comment.controller");
const { verifyToken } = require("../../middlewares/authMiddleware");

// GET semua komentar dari ticket
router.get("/:id/comments", verifyToken, controller.getComments);

// POST komentar baru ke ticket
router.post("/:id/comments", verifyToken, controller.createComment);

module.exports = router;
