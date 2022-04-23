import httpStatus from 'http-status';
import { v4 } from 'uuid';
import { TYPE_ROOM_EXIST } from '../../constants';
import { Rooms, User } from '../../models';
import { response } from '../../utils/helper.utils';
import { Types } from 'mongoose';

const create = async (payload) => {
	try {
		const { body, middleware } = payload;
		const { receiver } = body;

		const exist = await Rooms.findOne(
			{
				ownerId: middleware.id,
				receiver: receiver,
			},
			{ roomId: 1, color: 1, ownerId: 1, ownerType: 1, receiver: 1 }
		).exec();

		if (exist) {
			return response(exist, httpStatus.OK, httpStatus[200]);
		} else {
			const roomId = v4() + '-20112000';
			let result;
			if (receiver === middleware.id) {
				result = await Rooms.insertMany([
					{
						ownerId: middleware.id,
						receiver: receiver,
						roomId: roomId,
					},
				]);
			} else {
				result = await Rooms.insertMany([
					{
						ownerId: middleware.id,
						receiver: receiver,
						roomId: roomId,
					},
					{ ownerId: receiver, receiver: middleware.id, roomId: roomId },
				]);
			}

			return response(
				{
					roomId,
					color: result[0].color,
					ownerId: result[0].ownerId,
					ownerType: result[0].ownerType,
					receiver: result[0].receiver,
				},
				httpStatus.OK,
				httpStatus[200]
			);
		}
	} catch (error) {
		throw new Error(error);
	}
};

const index = async ({ query, middleware }) => {
	try {
		const { skip, limit } = query;
		const data = await Rooms.aggregate([
			{ $match: { ownerId: Types.ObjectId(middleware.id) } },
			{ $skip: skip },
			{ $limit: limit },
			{
				$lookup: {
					from: 'users',
					localField: 'receiver',
					foreignField: '_id',
					as: 'user',
				},
			},
			{
				$unwind: {
					path: '$messages',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'messages',
					localField: 'roomId',
					foreignField: 'roomId',
					as: 'messages',
				},
			},

			{
				$project: {
					roomId: 1,
					color: 1,
					ownerId: 1,
					ownerId: 1,
					receiver: 1,
					user: {
						fullName: 1,
						_id: 1,
						avatar: 1,
						username: 1,
					},
					messages: {
						_id: 1,
						message: 1,
						type: 1,
						status: 1,
						createdAt: 1,
						ownerId: 1,
						roomId: 1,
					},
				},
			},
			{ $sort: { 'messages.createdAt': 1 } },
		]).exec();

		let rooms = [];

		data.forEach((object) => {
			rooms.push({
				...object,
				user: {
					...object.user[0],
				},
				messages: {
					...object.messages[object.messages.length - 1],
				},
			});
		});

		return response(rooms, httpStatus.OK, httpStatus[200]);
	} catch (error) {
		throw new Error(error);
	}
};

const remove = async ({ params, middleware }) => {
	try {
		const { id } = params;
		const exist = await Rooms.find({
			receiver: id,
			ownerId: middleware.id,
		}).exec();

		if (!exist) {
			return response(null, httpStatus.NOT_FOUND, httpStatus[404]);
		} else {
			await Rooms.deleteOne({ receiver: id, ownerId: middleware.id });

			return response(httpStatus[200], httpStatus.OK, httpStatus[200]);
		}
	} catch (error) {
		throw new Error(error);
	}
};

const changeColor = async ({ middleware, body }) => {
	try {
		const { roomId, color } = body;
		await Rooms.updateMany(
			{ roomId: roomId },
			{ $set: { color: color } }
		).exec();

		return response({ roomId, color }, httpStatus.OK, httpStatus[200]);
	} catch (error) {
		throw new Error(error);
	}
};

export const RoomsServices = { index, create, remove, changeColor };
