const Joi = require('joi');

function registerValidation(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        phone: Joi.string().min(11).max(11),
    });
    return schema.validate(data, {abortEarly: false});
}

function loginValidation(data) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });
    return schema.validate(data);
}

module.exports = {
    registerValidation,
    loginValidation
}