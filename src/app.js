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

	app.get('/file/:filename', async (req, res) => {
		try {
			const file = await gfs.files.findOne({ filename: req.params.filename });
			const readStream = gfs.createReadStream(file.filename);
			readStream.pipe(res);
		} catch (error) {
			res.send('not found');
		}
	});

	app.listen(port, () => {
		console.log(`Server running ${env('APP_HOST')}:${port}`);
	});

	app.get('/', (req, res) => {
		res.status(httpStatus.OK).json({ message: 'Chào mừng' });
	});
}
