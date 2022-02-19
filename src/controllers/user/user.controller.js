import httpStatus from 'http-status';
import { UserServices } from '../../services';
import { response } from '../../utils/helper.utils';

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
async function rename(req, res, next) {}
async function nickName(req, res, next) {}
async function changeAvatar(req, res, next) {}
export const UserController = { list, rename, nickName, changeAvatar };
