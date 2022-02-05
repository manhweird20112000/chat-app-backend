import { model, Schema } from 'mongoose';

const schema = new Schema(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		username: { type: String },
		birthday: { type: Date, required: true },
		email: { type: String, unique: true, required: true },
		gender: { type: String, required: true, enum: ['MALE', 'FEMALE'] },
		password: { type: String, required: true },
		status: { type: String, required: true, enum: ['ACTIVE', 'INACTIVE'] },
		uuid: { type: String, unique: true },
		platform: { type: String, enum: ['ANDROID', 'IOS', 'WEB'] },
		note: { type: String },
	},
	{ timestamps: true }
);

export const User = model('User', schema);
