const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const User = require('../models/User');
const {loginValidation, registerValidation} = require('../middleware/validation');
const {hash} = require("bcrypt");

exports.signup = async (req, res, next) => {
    const {error, value} = registerValidation(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).json({error: 'Email already exists'});

    try {
        const newUser = await createNewUser(req);
        console.log(newUser);
        const response = await newUser.save();

        return res.status(200).json({
            message: 'User created successfully',
            user: response
        });
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

async function createNewUser(req) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    return new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
    });
}