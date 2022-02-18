import Joi from 'joi';

export const createRooms = {
	body: Joi.object().keys({
		receiver: Joi.string().required(),
	}),
};

// export const listRooms = {
// 	params: Joi.object().keys({
// 		limit: Joi.defaults(25),
// 		skip: Joi.defaults(0),
// 	}),
// };

// export const remove = {
// 	body: Joi.object().keys({
// 		id: Joi.string().required(),
// 	}),
// };
