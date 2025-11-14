const express = require("express");
const cors = require("cors");
const app = express();


// Middleware global
app.use(cors());
app.use(express.json());

// Import routes
const authRouter = require("./modules/auth/auth.router");
const ticketRouter = require("./modules/ticket/ticket.router");
// Gunakan route
app.use("/api/auth", authRouter);
app.use("/api/ticket", ticketRouter);
// Export app
module.exports = app;