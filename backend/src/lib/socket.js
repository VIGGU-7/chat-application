import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const server = http.createServer(app);

const allowedOrigin = process.env.clientUrl; // Single allowed frontend URL

// Express CORS for API routes
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

// Socket.IO Server with CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    credentials: true
  }
});

// Store online users { userId: socketId }
const userSocketMap = {};

// Get receiver's socket ID by userId
export function getReciverSocketId(userId) {
  return userSocketMap[userId];
}

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID ${socket.id}`);
  }

  io.emit('onlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);

    if (userId) {
      delete userSocketMap[userId];
    }

    io.emit('onlineUsers', Object.keys(userSocketMap));
  });
});

export { app, io, server };
