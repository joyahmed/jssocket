// src/index.ts
import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Handle Socket.IO connections
io.on('connection', (socket: Socket) => {
	console.log('A user connected:', socket.id);

	// Listen for chat messages
	socket.on('chatMessage', (msg: string) => {
		console.log('Message received:', msg);
		// Broadcast the message to all connected clients
		io.emit('chatMessage', msg);
	});

	// Handle disconnection
	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id);
	});
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
	console.log(`Socket.IO server is running on port ${PORT}`);
});
