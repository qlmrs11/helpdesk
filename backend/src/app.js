// src/app.js
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

// Import routes
const authRouter = require("./modules/auth/auth.router");
const ticketRouter = require("./modules/ticket/ticket.router");
const commentRouter = require("./modules/comment/comment.router");
const userRouter = require("./modules/user/user.router");

// Gunakan route
app.use("/api/auth", authRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/comments", commentRouter);
app.use("/api/user", userRouter);

module.exports = app;
