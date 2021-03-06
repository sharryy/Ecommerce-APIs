const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const User = require('../models/User');
const {loginValidation, registerValidation} = require('../middleware/UserValidation');

exports.signUp = async (req, res, next) => {
    const {error, value} = registerValidation(req.body);
    if (error) return res.status(400).json({success: false, message: error.details[0].message});

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).json({success: false, message: 'Email already exists'});

    try {
        const newUser = await createNewUser(req);
        const response = await newUser.save();

        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            user: response
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

exports.logIn = async (req, res) => {
    const {error, value} = loginValidation(req.body);
    if (error) return res.status(400).json({success: false, message: error.details[0].message});

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json({success: false, message: 'Invalid Email or Password'});

    try {
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({success: true, message: "Invalid Password"});

        const token = await jwt.sign({_id: user.id}, process.env.JWT_KEY);
        return res.status(200).header("auth-token", token).json({
            "success": true,
            "auth-token": token,
            userId: user._id
        });
    } catch (error) {
        res.status(400).json({error: error.message});
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