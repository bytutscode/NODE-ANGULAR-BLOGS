import Joi from 'joi';

export const createCategorySchema = Joi.object({
    category: Joi.string().max(100).min(2).required().messages({
        'string.min': 'The category must have at least 2 characters',
        'string.max': 'The category must not have more than 100 characters',
        'string.empty': 'The category field can not be empty',
        'any.required': 'The category field is required'
    })
})
