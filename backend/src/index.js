const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const registerCommentSocket = require("./websocket/comment.socket");
const { startGrpcServer, setSocketIO } = require("./grpc/notificationServer");

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

// Inject io → supaya bisa dipakai di controller lewat req.io
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Import routes SETELAH io injection
const authRouter = require("./modules/auth/auth.router");
const ticketRouter = require("./modules/ticket/ticket.router");
const commentRouter = require("./modules/comment/comment.router");
const userRouter = require("./modules/user/user.router");
const notificationRouter = require("./modules/notification/notification.router");

// Gunakan route
app.use("/api/auth", authRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/comment", commentRouter);
app.use("/api/user", userRouter);
app.use("/api/notification", notificationRouter);

// WebSocket Listener untuk Comment
registerCommentSocket(io);

// WebSocket Listener untuk Notification
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // Register user untuk notification
  socket.on('register_notification', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`👤 User ${userId} registered for notifications`);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Inject Socket.IO ke gRPC Server
setSocketIO(io);

// Start gRPC Notification Server
startGrpcServer();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Backend Server running on port ${PORT}`);
});