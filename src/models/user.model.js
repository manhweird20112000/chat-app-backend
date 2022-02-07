import { model, Schema } from 'mongoose';

const schema = new Schema(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		username: { type: String, required: true },
		birthday: { type: Date, required: true },
		email: { type: String, unique: true, required: true },
		gender: { type: String, required: true, enum: ['MALE', 'FEMALE'] },
		password: { type: String, required: true },
		status: { type: String, required: true, enum: ['ACTIVE', 'INACTIVE'] },
		uuid: { type: String, unique: true },
		platform: { type: String, enum: ['ANDROID', 'IOS', 'WEB'], default: 'WEB' },
		note: { type: String },
		rememberToken: {type: String, required: true}
	},
	{ timestamps: true }
);

export const User = model('User', schema);
