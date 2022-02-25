import { model, Schema } from 'mongoose';

const schema = new Schema({
	type: {
		type: String,
		required: true,
		default: 'IMAGE',
		enum: ['IMAGE', 'FILE'],
	},
	size: {
		type: Number,
		required: true,
	},
	extension: {
		type: String,
		required: true,
	},
	filename: {
		type: String,
		required: true,
	},
	path: {
		type: String,
		required: true,
	},
});

export const Media = model('Media', schema);
