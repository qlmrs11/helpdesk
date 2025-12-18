// backend/src/modules/ticket/ticket.router.js
const router = require("express").Router();
const controller = require("./ticket.controller");
const { authMiddleware, authorizeRoles } = require("../../middlewares/authMiddleware");

// USER routes
router.post("/", authMiddleware, authorizeRoles("USER"), controller.createTicket);
router.get("/user", authMiddleware, authorizeRoles("USER"), controller.getUserTickets);
router.patch("/:id/confirm", authMiddleware, authorizeRoles("USER"), controller.confirmResolved);

// HELPER routes
router.get("/helper", authMiddleware, authorizeRoles("HELPER"), controller.getHelperTickets);
router.patch("/:id/assign", authMiddleware, authorizeRoles("HELPER"), controller.assignTicket);
router.patch("/:id/status", authMiddleware, authorizeRoles("HELPER"), controller.updateStatus);

// SHARED routes (USER & HELPER)
router.get("/:id", authMiddleware, controller.getTicketById);

module.exports = router;