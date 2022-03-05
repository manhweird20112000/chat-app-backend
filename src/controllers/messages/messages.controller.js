import httpStatus from 'http-status';
import { MessagesServices } from '../../services';
import { response } from '../../utils/helper.utils';

const send = async (req, res, next) => {
	try {
		const response = await MessagesServices.send({
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

const list = async (req, res, next) => {
	try {
		const response = await MessagesServices.list({
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
		const response = await MessagesServices.remove({
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

const read = async (req, res, next) => {
	try {
		const response = await MessagesServices.read({
			body: req.body,
			middleware: req.user,
		});
		res.status(httpStatus.OK).json(response);
	} catch (error) {
		console.log(error)
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(response(null, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[500]));
	}
};

export const MessagesControllers = { send, list, remove, read };
