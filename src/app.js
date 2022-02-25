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
import { MediaServices } from './services';

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

	const io = new Server(server, { cors: { origin: '*' } });

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

	app.use(cors());

	app.use(morgan('tiny'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use('/api', api);

	server.listen(port, () => {
		console.log(`Server running ${env('APP_HOST')}:${port}`);
	});

	app.get('/', (req, res) => {
		res.status(httpStatus.OK).json({ message: 'Chào mừng' });
	});

	app.get('/file/:id', async (req, res) => {
		try {
			let rootFolder = __dirname.split('src');

			const media = await MediaServices.show(req.params.id);
			res.sendFile(rootFolder[0] + media.path);
		} catch (error) {
			res.status(httpStatus.NOT_FOUND);
		}
	});
}
