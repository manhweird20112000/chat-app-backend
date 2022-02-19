import httpStatus from 'http-status';
import { object } from 'joi';
import { Types } from 'mongoose';
import { TYPE_ROOM_EXIST } from '../../constants';
import { Rooms, User } from '../../models';
import { response } from '../../utils/helper.utils';

const create = async (payload) => {
	try {
		const { body, middleware } = payload;
		const { receiver } = body;

		const exist = await Rooms.findOne({
			ownerId: middleware.id,
			receiver: receiver,
		}).exec();

		if (exist) {
			return response(
				{ type: TYPE_ROOM_EXIST },
				httpStatus.CONFLICT,
				httpStatus[409]
			);
		} else {
			const result = await Rooms.insertMany([
				{
					ownerId: middleware.id,
					receiver: receiver,
				},
				{ ownerId: receiver, receiver: middleware.id },
			]);

			return response(
				{
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
		console.log(error);
		throw new Error(error);
	}
};

const index = async ({ query, middleware }) => {
	try {
		const { skip, limit } = query;
		const data = await Rooms.aggregate([
			{ $match: { ownerId: Types.ObjectId(middleware.id) } },
			{
				$lookup: {
					from: 'users',
					localField: 'receiver',
					foreignField: '_id',
					as: 'user',
				},
			},
		])
			.limit(limit)
			.skip(skip)
			.exec();
		console.log(data);

		let rooms = [];

		data.forEach((object) => {
			const { __v, createdAt, updatedAt, ...room } = object;
			rooms.push({
				...room,
				user: {
					fullname: room.user[0].firstName + ' ' + room.user[0].lastName,
					id: room.receiver,
				},
			});
		});

		return response(rooms, httpStatus.OK, httpStatus[200]);
	} catch (error) {
		console.log(error);
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

export const RoomsServices = { index, create, remove };
