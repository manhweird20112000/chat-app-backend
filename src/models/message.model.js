import { model, Schema } from 'mongoose';

const schema = new Schema(
	{
		message: { type: String, required: true },
		type: {
			type: String,
			required: true,
			default: 'TEXT',
			enum: ['TEXT', 'LINK', 'FILE'],
		},
		roomId: { type: String, ref: 'Rooms', required: true },
		ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		status: {
			type: String,
			default: 'SENT',
			required: true,
			enum: ['SENT', 'SEEN', 'REP'],
		},
	},
	{
		timestamps: true,
	}
);

export const Messages = model('Messages', schema);
