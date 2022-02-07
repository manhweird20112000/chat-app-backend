import httpStatus from 'http-status';
import { AuthServices } from '../../services';
import { response } from '../../utils/helper.utils';

async function register(req, res, next) {
	try {
		const response = await AuthServices.register(req.body);
		res.status(httpStatus.OK).json(response);
	} catch (error) {
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(response(null, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500]));
	}
}

async function login(req, res, next) {
	try {
		const response = await AuthServices.login(req.body);
		res.status(httpStatus.OK).json(response);
	} catch (error) {
		console.log(error);
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(response(null, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500]));
	}
}

async function logout(req, res, next) {
	try {
		console.log(req.user);
		const response = await AuthServices.logout(req.body);
		res.status(httpStatus.OK).json(response);
	} catch (error) {
		console.log(error);
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(response(null, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500]));
	}
}

export const AuthController = { register, login, logout };
