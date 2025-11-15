const express = require("express");
const router = express.Router();
const controller = require("./ticket.controller");
const { verifyToken } = require("../../middlewares/authMiddleware");

router.post("/", verifyToken, controller.create);

module.exports = router;
