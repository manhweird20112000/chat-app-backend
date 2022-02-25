import httpStatus from 'http-status';
import { MediaServices } from '..';
import { STATUS_ACTIVE } from '../../constants';
import { User } from '../../models';
import { response } from '../../utils/helper.utils';

async function list({ query }) {
	try {
		const { skip = 0, limit = 25, username } = query;
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
		console.log(error);
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

export const UserServices = { list, uploadAvatar };
