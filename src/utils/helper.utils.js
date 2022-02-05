import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import httpStatus from 'http-status';
import moment from 'moment';

export const env = (key) => {
	return process.env[key];
};

export const hashBcrypt = async (password, optional = 10) => {
	const salt = genSaltSync(optional);
	const passwordHash = hashSync(password, salt);
	return passwordHash;
};

export const vertifyPassword = async (password, passwordServer) => {
	return compareSync(password, passwordServer);
};

export const response = (
	data = null,
	statusCode = httpStatus.INTERNAL_SERVER_ERROR,
	message = httpStatus[500]
) => {
	return {
		data,
		statusCode,
		message,
	};
};

export const validate = async (schema) => (req, res, next) => {
	try {
		schema.validateAsync(req.body, {
			abortEarly: false,
		});

		next();
	} catch (error) {
		res.status(httpStatus.BAD_REQUEST).json(httpStatus[400]);
	}
};

export const formatDate = (time, format) => {
	return moment(time, format);
};
