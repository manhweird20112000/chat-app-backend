import express from 'express';
import httpStatus from 'http-status';
import Grid from 'gridfs-stream';
import { connectDB } from './config/database.config';
import { env } from './utils/helper.utils';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { api } from './routes';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

connectDB()
	.then(() => {
		console.log('Database connecting ...');
	})
	.then(() => {
		startApp();
	})
	.catch((error) => {
		process.exit(1);
	});

function startApp() {
	const app = express();
	const server = http.createServer(app);

	const io = new Server(server);

	io.on('connection', (socket) => {
		console.log('connect');
	});

	const port = process.env.PORT || env('APP_PORT');

	let gfs;
	const conn = mongoose.connection;
	conn.once('open', function () {
		gfs = Grid(conn.db, mongoose.mongo);
		gfs.collection('photos');
	});

	app.use(
		cors({
			origin: '*',
			methods: ['GET', 'POST'],
			allowedHeaders: ['Content-Type'],
			credentials: true,
		})
	);
	app.options('*', cors({ origin: '*' }));

	app.use(morgan('tiny'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use('/api', api);

	server.listen(port, () => {
		console.log(`Server running ${env('APP_HOST')}:${port}`);
	});

	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		);
		next();
	});

	app.use(function (req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, OPTIONS, PUT, PATCH, DELETE'
		);
		res.setHeader(
			'Access-Control-Allow-Headers',
			'X-Requested-With,content-type'
		);
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
	});

	app.get('/', (req, res) => {
		res.status(httpStatus.OK).json({ message: 'Chào mừng' });
	});
}
