const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            get: value => value.charAt(0).toUpperCase() + value.slice(1),
            set: value => value.toLowerCase()
        },
    }, {timestamps: true, toJSON: {getters: true}}
);

module.exports = mongoose.model('Category', categorySchema);