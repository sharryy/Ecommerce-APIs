const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category ID is required']
        },
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            get: v => v.charAt(0).toUpperCase() + v.slice(1),
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            trim: true,
            default: 0,
            get: value => value.toFixed(2)
        },
        product_image: {
            type: String,
            required: false
        },
        sku: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    }, {timestamps: true, toJSON: {getters: true}}
);

module.exports = mongoose.model('Product', productSchema);