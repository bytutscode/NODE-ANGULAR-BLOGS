import Joi from 'joi';

export const updateUserSchema = Joi.object({
    name: Joi.string().max(100).min(2).messages({
        'string.min': 'The name must have at least 2 characters',
        'string.max': 'The name must not have more than 100 characters',
        'string.empty': 'The name field can not be empty'
    }),
    email: Joi.string().email().max(100).messages({
        'string.email': 'Invalid email, please verify your email and try again',
        'string.max': 'The name must not have more than 100 characters'
    }),
    password: Joi.string().min(8).max(250).messages({
        'string.min': 'The password must have at least 8 characters',
        'string.max': 'The password must not have more than 250 characters',
        'string.empty': 'The password field can not be empty'
    })
})
