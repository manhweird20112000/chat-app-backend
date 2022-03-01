import express from 'express';
import httpStatus from 'http-status';
import { connectDB } from './config/database.config';
import { env } from './utils/helper.utils';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { api } from './routes';
import { MediaServices, server } from './services';

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

	app.use(cors());

	app.use(morgan('tiny'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use('/api', api);

	app.listen(port, () => {
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
