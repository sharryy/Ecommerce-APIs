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
        await Product.find({}, {__v: 0})
            .populate('category_id', "name createdAt updatedAt", {})
            .exec((error, products) => {
                if (error) return res.status(500).json({success: false, message: error.message});
                return res.status(200).json({
                    success: true,
                    message: "Products retrieved successfully",
                    length: products.length,
                    products: products
                });
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting categories. Please try again later." + error.message
        });
    }
}

exports.getProductById = async(req, res) => {
    try {
        await Product.findById(req.params.id, {__v: 0})
            .populate('category_id', "name createdAt updatedAt", {})
            .exec((error, product) => {
                if (error) return res.status(500).json({success: false, message: error.message});
                if (!product) return res.status(404).json({success: false, message: "Product not found"});
                return res.status(200).json({
                    success: true,
                    message: "Product retrieved successfully",
                    product: product
                });
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting product. Please try again later." + error.message
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
