const Cart = require('../models/Cart');
const Product = require('../models/Product');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

exports.createOrder = async (req, res, next) => {
    const newOrder = {
        product: req.body.product_id,
        quantity: parseInt(req.body.quantity),
        user: req.body.user_id
    }

    try {
        const stock = await Product.findById(newOrder.product);

        if (newOrder.quantity > stock.quantity) {
            return res.status(200).json({
                success: true,
                message: 'Not enough stock'
            });
        }

        const cart = await Cart.create(newOrder);
        const updatedQuantity = {quantity: stock.quantity - newOrder.quantity};
        await Product.findByIdAndUpdate(stock.id, updatedQuantity, {new: true});
        return res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getOrder = async (req, res, next) => {
    await Cart.findById(req.params.id, {__v: 0})
        .populate('product', {id: 0, createdAt: 0, updatedAt: 0, __v: 0})
        .populate('user', {id: 0, createdAt: 0, updatedAt: 0, __v: 0})
        .exec((error, order) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error,
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Order retrieved successfully',
                length: order.length,
                data: order
            });
        });
}

exports.getUserOrders = async (req, res, next) => {
    await Cart.find({user: req.params.id}, {__v: 0})
        .populate('product', {id: 0, createdAt: 0, updatedAt: 0, __v: 0})
        .populate('user', {id: 0, createdAt: 0, updatedAt: 0, __v: 0})
        .exec((error, orders) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error,
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Orders retrieved successfully',
                length: orders.length,
                data: orders
            });
        });
}

