const Joi = require('joi');

function registerValidation(data) {
    const schema = {
        name: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        phone: Joi.string().min(10).max(10),
    }
    return schema.validate(data);
}

function loginValidation(data) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }
    return schema.validate(data);
}