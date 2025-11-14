// pathnya src/modules/ticket/ticket.router.js
const express = require("express");
const router = express.Router();
const controller = require("./ticket.controller");
const { verifyToken, authorizeRoles } = require("../../middlewares/authMiddleware");

//Create ticket (cuman USER)
router.post("/", verifyToken, authorizeRoles("USER"), controller.createTicket);

//Get all tickets (HELPER bisa ngeliat semua, USER cuman bisa lihat punyanya)
router.get("/", verifyToken, controller.getTickets);

//Get ticket by ID
router.get("/:id", verifyToken, controller.getTicketById);

//Helper claim/assign ticket
router.patch("/:id/assign", verifyToken, authorizeRoles("HELPER"), controller.assignTicket);

//Update ticket status (HELPER only)
router.patch("/:id/status", verifyToken, authorizeRoles("HELPER"), controller.updateStatus);

module.exports = router;
