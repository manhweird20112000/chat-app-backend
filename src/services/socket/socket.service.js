import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { env } from '../../utils/helper.utils';

export const app = express();

export const server = http.createServer(app);

export const io = new Server(server, { cors: { origin: '*' } });

// Middleware
// io.use(function (socket, next) {
// 	if (socket.handshake.query && socket.handshake.query.token) {
// 		const token = socket.handshake.query.token.split(' ')[1];
// 		jwt.verify(token, env('JWT_SERECT'), (error, data) => {
// 			if (error) {
// 				return new Error('Authorzation error.');
// 			} else {
// 				next();
// 			}
// 		});
// 	} else {
// 		next(new Error('Authentication error.'));
// 	}
// });

let room;

// Events
io.on('connection', (socket) => {
	// check connecting
	io.emit('connected', true);

	// Lắng nghe sự kiện join room của người dùng
	socket.on('joinRoom', (data) => {
		const { roomId } = data;
		socket.join(roomId);

		room = roomId;

		// Phát tín hiệu cho người khác mình vừa join room
		socket.broadcast.to(roomId).emit('message', 'Hello !');
	});

	// Người dùng mới liên kết với nhau
	socket.on('connectFriend', (data) => {
		io.to(room).emit('connectFriend', data);
	});

	// Người dùng đang cào phím
	socket.on('typing', (data) => {
		console.log(data);
		io.to(room).emit('typing', data);
	});

	// Người dùng gửi tin nhắn
	socket.on('send', (data) => {
		io.to(room).emit('send', data);
		io.emit('sendAll', data);
	});

	// Người dùng đọc tin nhắn
	socket.on('read', (data) => {
		io.to(room).emit('read', data);
		io.emit('readAll', data);
	});

	// Người dùng làm điều đặc biệt
	socket.on('love', (data) => {
		io.to(room).emit('send', data);
	});
});
