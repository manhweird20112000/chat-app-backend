import Joi from 'joi';

export const list = {
	query: Joi.object().keys({
		skip: Joi.number().default(0),
		limit: Joi.number().default(50),
		username: Joi.string().required(),
	}),
};
