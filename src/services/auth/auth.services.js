import {
	env,
	formatDate,
	hashBcrypt,
	response,
	vertifyPassword,
} from '../../utils/helper.utils';
import httpStatus from 'http-status';
import {
	EMAIL_EXIST,
	STATUS_ACTIVE,
	USER_NOT_EXIST,
	VERIFICATION_FAILED,
} from '../../constants';
import { v1, v4 } from 'uuid';
import { User } from '../../models';
import jwt from 'jsonwebtoken';

async function register(payload) {
	try {
		const { email } = payload;
		let exist = await User.findOne({ email }).exec();

		if (exist) {
			return response(null, httpStatus.CONFLICT, EMAIL_EXIST);
		} else {
			payload.password = await hashBcrypt(payload.password);
			payload.birthday = formatDate(payload.birthday, 'DD-MM-YYYY');
			payload.status = STATUS_ACTIVE;
			payload.username = v1();
			payload.uuid = v4();

			const refeshToken = jwt.sign(
				{ ...payload, password: null },
				env('JWT_SERECT'),
				{ expiresIn: env('REFRESH_TOKEN_LIFE') }
			);

			payload.rememberToken = refeshToken;

			const user = new User(payload);
			await user.save();

			return response(
				{ ...payload, password: null },
				httpStatus.CREATED,
				httpStatus[201]
			);
		}
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
}

async function login(payload) {
	try {
		const { email, password } = payload;
		const exist = await User.findOne({ email }).exec();

		if (!exist) {
			return response(null, httpStatus.NOT_FOUND, USER_NOT_EXIST);
		} else {
			const flag = await vertifyPassword(password, exist?.password);
			if (!flag) {
				return response(null, httpStatus.UNAUTHORIZED, VERIFICATION_FAILED);
			} else {
				const user = {
					firstName: exist.firstName,
					lastName: exist.lastName,
					email: exist.email,
					status: exist.status,
					gender: exist.gender,
					birthday: exist.birthday,
					username: exist.username,
					id: exist.id,
				};
				const token = jwt.sign(user, env('JWT_SERECT'), {
					expiresIn: env('ACCESS_TOKEN_LIFE'),
				});

				return response(
					{ ...user, accessToken: token },
					httpStatus.OK,
					httpStatus[200]
				);
			}
		}
	} catch (error) {
		throw new Error(error);
	}
}

async function logout(payload) {
	try {
		console.log(payload);
	} catch (error) {
		throw new Error(error);
	}
}

export const AuthServices = { register, login, logout };
