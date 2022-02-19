import Joi from 'joi';

export const send = {
	body: Joi.object().keys({
		message: Joi.string().required(),
		roomId: Joi.string().required(),
	}),
};

export const list = {
	query: Joi.object().keys({
		roomId: Joi.string().required(),
		skip: Joi.number().default(0),
		limit: Joi.number().default(50),
	}),
};

export const remove = {
	body: Joi.object().keys({
		id: Joi.string().required(),
	}),
};
