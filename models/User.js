const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
            get: value => value.charAt(0).toUpperCase + value.slice(1),
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        phone: {
            type: String,
            trim: true,
            required: true
        },
    }, {timestamps: true}, {toJSON: {getters: true}}
);

module.exports = mongoose.model('User', UserSchema);