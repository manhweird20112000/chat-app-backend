import Joi from 'joi';

export const createRooms = {
	body: Joi.object().keys({
		receiver: Joi.string().required(),
	}),
};

export const list = {
	query: Joi.object().keys({
		skip: Joi.number().default(0),
		limit: Joi.number().default(50),
	}),
};

export const remove = {
	body: Joi.object().keys({
		id: Joi.string().required(),
	}),
};
