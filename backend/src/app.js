// src/app.js
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

// Import routes
const authRouter = require("./modules/auth/auth.router");

// Gunakan route
app.use("/api/auth", authRouter);
app.use("/api/tickets", require("./modules/ticket/ticket.router"));

// Export app
module.exports = app;