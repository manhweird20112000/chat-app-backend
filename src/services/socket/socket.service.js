import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { env } from '../../utils/helper.utils';

const app = express();

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

// Events
io.on('connection', (socket) => {
	// check connecting
	io.emit('connected', true);

	io.emit('flex', 'ok');
});
