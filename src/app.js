import express from 'express';
import httpStatus from 'http-status';
import { connectDB } from './config/database.config';
import { env } from './utils/helper.utils';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { api } from './routes';

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
	const port =
		 process.env.PORT || env('APP_PORT')

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
}
