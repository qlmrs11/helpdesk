const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const registerCommentSocket = require("./websocket/comment.socket");

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

// WebSocket Listener
registerCommentSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`SERVERNYA JALAN DI PORT ${PORT}`);
});
