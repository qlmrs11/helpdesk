// backend/src/index.js
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const registerCommentSocket = require("./websocket/comment.socket");

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// ⚠️ INJECT IO SEBELUM ROUTES
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Import routes SETELAH io injection
const authRouter = require("./modules/auth/auth.router");
const ticketRouter = require("./modules/ticket/ticket.router");
const commentRouter = require("./modules/comment/comment.router");
const userRouter = require("./modules/user/user.router");

// Gunakan route
app.use("/api/auth", authRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/comment", commentRouter);
app.use("/api/user", userRouter);

// WebSocket Listener
registerCommentSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 SERVERNYA JALAN DI PORT ${PORT}`);
});