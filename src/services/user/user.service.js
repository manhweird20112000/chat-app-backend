import httpStatus from 'http-status';
import { Types } from 'mongoose';
import { MediaServices } from '..';
import {
	STATUS_ACTIVE,
	TYPE_UPDATE_FULLNAME,
	TYPE_UPDATE_PASSWORD,
	TYPE_UPDATE_USERNAME,
} from '../../constants';
import { User } from '../../models';
import { response } from '../../utils/helper.utils';

async function list({ query }) {
	try {
		const { skip, limit, username } = query;
		let params = { status: STATUS_ACTIVE };

		if (username) {
			params['username'] = {
				$regex: '.*' + username + '.*',
			};
		}

		const users = await User.aggregate([
			{ $skip: skip },
			{ $limit: limit },
			{
				$project: {
					firstName: 1,
					lastName: 1,
					username: 1,
					gender: 1,
					status: 1,
				},
			},
			{ $match: params },
		]).exec();

		return response(users, httpStatus.OK, httpStatus[200]);
	} catch (error) {
		throw new Error(error);
	}
}

async function uploadAvatar({ file, middleware }) {
	try {
		const avatar = await MediaServices.upload(file, 'IMAGE');
		await User.findByIdAndUpdate(middleware.id, {
			$set: { avatar: avatar },
		});
		return response({ avatar: avatar }, httpStatus.OK, httpStatus[200]);
	} catch (error) {
		throw new Error(error);
	}
}

async function updateInfo({ body, middleware, params, query }) {
	try {
		const { type, username, firstName, lastName } = body;

		switch (type) {
			case TYPE_UPDATE_USERNAME:
				await User.updateOne(
					{ _id: Types.ObjectId(middleware.id) },
					{ $set: { username: username } }
				);
				break;
			case TYPE_UPDATE_FULLNAME:
				await User.updateOne(
					{ _id: Types.ObjectId(middleware.id) },
					{ $set: { username: username } }
				);
				break;
			case TYPE_UPDATE_PASSWORD:
				await User.updateOne(
					{ _id: Types.ObjectId(middleware.id) },
					{
						$set: {
							lastName: lastName.trim(),
							firstName: firstName.trim(),
							fullName: firstName.trim() + '' + lastName.trim(),
						},
					}
				);
				break;
			default:
				console.log('No Services.');
				break;
		}
		return response(httpStatus[200], httpStatus.OK, httpStatus[200]);
	} catch (error) {
		throw new Error(error);
	}
}



export const UserServices = { list, uploadAvatar, updateInfo };
