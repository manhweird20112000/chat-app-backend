import httpStatus from 'http-status';
import { env, response } from '../utils/helper.utils';
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
	const authorization = req.headers['authorization'];
	if (authorization === undefined) {
		res
			.status(httpStatus.UNAUTHORIZED)
			.json(response(null, httpStatus.UNAUTHORIZED, httpStatus['401']));
	} else {
		const token = authorization.split(' ')[1];
		if (!token) {
			res
				.status(httpStatus.UNAUTHORIZED)
				.json(response(null, httpStatus.UNAUTHORIZED, httpStatus['401']));
		} else {
			jwt.verify(token, env('JWT_SERECT'), (error, data) => {
				if (error) {
					res
						.status(httpStatus.UNAUTHORIZED)
						.json(response(null, httpStatus.UNAUTHORIZED, httpStatus['401']));
				} else {
					req.user = data;
					next();
				}
			});
		}
	}
};
