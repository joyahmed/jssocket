"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    // Listen for a notification event
    socket.on('sendNotification', (notification) => {
        console.log('Notification received:', notification);
        // Broadcast the notification to all connected clients
        io.emit('notification', notification);
    });
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Socket.IO server is running on port ${PORT}`);
});
