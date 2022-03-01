import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import httpStatus from 'http-status';
import moment from 'moment';
import Joi from 'joi';

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

/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
export const pick = (object, keys) => {
	return keys.reduce((obj, key) => {
		if (object && Object.prototype.hasOwnProperty.call(object, key)) {
			// eslint-disable-next-line no-param-reassign
			obj[key] = object[key];
		}
		return obj;
	}, {});
};

export const validate = (schema) => (req, res, next) => {
	const validSchema = pick(schema, ['params', 'query', 'body']);
	const object = pick(req, Object.keys(validSchema));
	const { value, error } = Joi.compile(validSchema)
		.prefs({ errors: { label: 'key' }, abortEarly: false })
		.validate(object);

	if (error) {
		const errorMessage = error.details
			.map((details) => details.message)
			.join(', ');
		return res
			.status(httpStatus.BAD_REQUEST)
			.json(response(null, httpStatus.BAD_REQUEST, httpStatus[400]));
	}
	Object.assign(req, value);
	return next();
};

export const formatDate = (time, format) => {
	return moment(time, format);
};
