import mongoose from 'mongoose';
import { env } from '../utils/helper.utils';

export const connectDB = async () => {
	const uri = `mongodb+srv://${env('MONGO_USERNAME')}:${env(
		'MONGO_PASSWORD'
	)}@cluster0.qy1kp.mongodb.net/${env(
		'MONGO_DATABASENAME'
	)}?retryWrites=true&w=majority`;

	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};
