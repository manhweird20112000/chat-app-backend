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
	console.log(req.files)
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

async function showAvatar(req, res, next) {
	try {
		const file = gfs.files.findOne({ filename: req.params.filename });
		const readStream = gfs.createReadStream(file.filename);
		readStream.pipe(res);
	} catch (error) {
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(response(null, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500]));
	}
}

async function rename(req, res, next) {}
async function nickName(req, res, next) {}

export const UserController = {
	list,
	rename,
	nickName,
	uploadAvatar,
	showAvatar,
};
