import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string().email().max(100).required().messages({
        'string.email': 'Invalid email, please verify your email and try again',
        'string.max': 'The name must not have more than 100 characters',
        'any.required': 'The email field is required'
    }),
    password: Joi.string().min(8).max(250).required().messages({
        'string.min': 'The password must have at least 8 characters',
        'string.max': 'The password must not have more than 250 characters',
        'string.empty': 'The password field can not be empty',
        'any.required': 'The password field is required'
    })
})