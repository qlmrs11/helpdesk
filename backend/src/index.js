import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import ticketRouter from "./modules/ticket/ticket.router.js";
import authRouter from "./routes/authRoutes.js";

import initSocket from "./socket/index.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/ticket", ticketRouter);

const server = http.createServer(app);

// INIT SOCKET
initSocket(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
