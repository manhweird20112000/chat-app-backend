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

export const logout = {
	body: Joi.object().keys({
		token: Joi.string().required(),
	}),
};

export const rememberToken = {
	body: Joi.object().keys({
		refreshToken: Joi.string().required(),
	}),
};
