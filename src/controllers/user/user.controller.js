import httpStatus from 'http-status';
import { UserServices } from '../../services';
import { response } from '../../utils/helper.utils';
import Grid from 'gridfs-stream';

async function list(req, res, next) {
	try {
		const response = await UserServices.list({ query: req.query });
		res.status(httpStatus.OK).json(response);
	} catch (error) {
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(response(null, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500]));
	}
}

async function uploadAvatar(req, res, next) {
	try {
		const response = await UserServices.uploadAvatar({
			file: req.file,
			middleware: req.user,
		});
		res.status(httpStatus.OK).json(response);
	} catch (error) {
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(response(null, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500]));
	}
}

async function updateInfo(req, res, next) {
	try {
		const response = await UserServices.updateInfo({
			body: req.body,
			middleware: req.user,
		});
		res.status(httpStatus.OK).json(response);
	} catch (error) {
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(response(null, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500]));
	}
}

export const UserController = {
	list,
	uploadAvatar,
	updateInfo,
};
