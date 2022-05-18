const Product = require('../models/Product');
const {validateProduct} = require('../middleware/ProductValidation')


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

exports.createProduct = async function (req, res, next) {
    const {error, value} = validateProduct(req.body);
    if (error) return res.status(400).json({"error": error.details[0].message});

    try {
        const product = await createNewProduct(req);
        const response = await product.save();

        return res.status(200).json({"message": "Product created successfully", "product": response});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

async function createNewProduct(req) {
    return new Product({
        category_id: req.body.category_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        product_image: req.body.image,
        sku: req.body.category,
        quantity: req.body.quantity,
    });
}
