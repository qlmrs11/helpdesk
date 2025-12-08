// src/modules/ticket/ticket.router.js
const express = require("express");
const router = express.Router();
const controller = require("./ticket.controller");
const { verifyToken, authorizeRoles } = require("../../middlewares/authMiddleware");

// USER create ticket
router.post("/", verifyToken, authorizeRoles("USER"), controller.createTicket);

// LIST tickets
router.get("/", verifyToken, controller.getTickets);

// PATCH routes 
router.patch("/:id/assign", verifyToken, authorizeRoles("HELPER"), controller.assignTicket);

router.patch("/:id/status", verifyToken, authorizeRoles("HELPER"), controller.updateStatus);

router.patch("/:id/confirm", verifyToken, authorizeRoles("USER"), controller.confirmTicket);

// GET detail ticket
router.get("/:id", verifyToken, controller.getTicketById);

module.exports = router;
