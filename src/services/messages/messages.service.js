import httpStatus from 'http-status';
import { Types } from 'mongoose';
import { Messages } from '../../models';
import { response } from '../../utils/helper.utils';

const send = async ({ body, middleware }) => {
	try {
		const { message, roomId } = body;
		const { id } = middleware;
		const messages = new Messages({ message, roomId, ownerId: id });
		await messages.save();

		return response(messages, httpStatus.CREATED, httpStatus[201]);
	} catch (error) {
		throw new Error(error);
	}
};

const list = async ({ query }) => {
	try {
		const { roomId, skip, limit } = query;
		const listMessages = await Messages.aggregate([
			{ $match: { roomId: Types.ObjectId(roomId) } },
			{ $limit: limit },
			{ $skip: skip },
			{
				$lookup: {
					from: 'users',
					localField: 'ownerId',
					foreignField: '_id',
					as: 'user',
				},
			},
		]).exec();

		let messages = [];

		listMessages.forEach((object) => {
			messages.push({
				...object,
				user: {
					fullname: object.user[0].firstName + ' ' + object.user[0].lastName,
					id: object.user[0]._id,
					avatar: '',
				},
			});
		});

		return response(messages, httpStatus.OK, httpStatus[200]);
	} catch (error) {
		throw new Error(error);
	}
};

const remove = async ({ body }) => {
	try {
		const { id } = body;
		await Messages.findByIdAndRemove(id);
		return response(httpStatus[200], httpStatus.OK, httpStatus[200]);
	} catch (error) {
		throw new Error(error);
	}
};

export const MessagesServices = { send, list, remove };
