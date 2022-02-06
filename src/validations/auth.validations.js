import Joi from 'joi';
export const authRegister = {
	body: Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		gender: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().required().min(6),
		birthday: Joi.string().required(),
	}),
};

export const authLogin = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		password: Joi.string().required(),
	}),
};
