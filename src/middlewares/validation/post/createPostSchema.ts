import joi from 'joi';

export const createPostSchema = joi.object({
    category_id: joi.required().messages({
        'number.required': 'The category id is required',
        'number': 'The category id must be a number'
    }),
    title: joi.string().min(2).max(250).required().messages({
        'string.required': 'The title is required and must have between 2 and 250 characters',
        'string.min': 'The title is required and must have between 2 and 250 characters',
        'string.max': 'The title is required and must have between 2 and 250 characters',
    }),
    content: joi.string().min(2).required().messages({
        'string.min': 'The min content is 2 characters',
        'string.required': 'The content is required'
    })
})