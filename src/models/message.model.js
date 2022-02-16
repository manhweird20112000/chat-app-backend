import { model, Schema } from 'mongoose';

const schema = new Schema(
	{
		message: { type: String, required: true },
		roomId: { type: Schema.Types.ObjectId, ref: 'Rooms', required: true },
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
