const Joi = require('joi');

function validateProduct(data) {
    const schema = Joi.object({
        category_id: Joi.number().integer().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().integer().required(),
        product_image: Joi.string(),
        sku: Joi.string().required(),
        quantity: Joi.number().integer().required(),
    });
    return schema.validate(data);
}