import httpStatus from 'http-status';
import { RoomsServices } from '../../services';
import { response } from '../../utils/helper.utils';

const create = async (req, res, next) => {
	try {
		const response = await RoomsServices.create({
			body: req.body,
			middleware: req.user,
		});
		res.status(httpStatus.OK).json(response);
	} catch (error) {
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(response(null, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500]));
	}
};

const index = async (req, res, next) => {
	try {
		const response = await RoomsServices.index({
			query: req.query,
			middleware: req.user,
		});
		res.status(httpStatus.OK).json(response);
	} catch (error) {
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(response(null, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500]));
	}
};

const remove = async (req, res, next) => {
	try {
		const response = await RoomsServices.remove({
			params: req.params,
			middleware: req.user,
		});
		res.status(httpStatus.OK).json(response);
	} catch (error) {
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(response(null, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500]));
	}
};
export const RoomsController = { index, create, remove };
