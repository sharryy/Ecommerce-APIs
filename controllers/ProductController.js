const Product = require('../models/Product');
const {validateProduct} = require('../middleware/ProductValidation')


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

exports.createProduct = async (req, res, next) => {
    const {error, value} = validateProduct(req.body);
    if (error) return res.status(400).json({success: false, message: error.details[0].message});

    try {
        const product = await createNewProduct(req);
        const response = await product.save();

        return res.status(200).json({success: false, message: "Product created successfully", product: response});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const data = await Product.find().populate({path: 'category', select: '_id name createdAt updatedAt'});
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            length: data.length,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function createNewProduct(req) {
    return new Product({
        category_id: req.body.category_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        product_image: req.body.image,
        sku: req.body.sku,
        quantity: req.body.quantity,
    });
}
