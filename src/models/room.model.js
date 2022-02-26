import { model, Schema } from 'mongoose';

const schema = new Schema(
	{
		roomId: { type: String, required: true },
		color: { type: String, default: '#f2484c', enum: ['#f2484c'] },
		ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		ownerType: { type: String, default: 'USER', enum: ['USER', 'GROUP'] },
		receiver: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Rooms = model('Rooms', schema);
