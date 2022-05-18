const Category = require('../models/Category');

if (process.env.NODE_ENV === 'production') {
    require('dotenv').config();
}

exports.createCategory = async function (req, res, next) {
    //if category with same name already exists, return error
    const category = await Category.findOne({name: req.body.name});
    if (category) return res.status(400).json({message: 'Category with this name already exists'});

    const newCategory = new Category({name: req.body.name});
    newCategory.save((error, category) => {
        if (error) return res.status(500).json({message: "Error creating category. Please try again later."});
        return res.status(200).json({message: "Category created successfully", category: category});
    });
}

exports.getAllCategories = async function (req, res, next) {
    Category.find({}, "_id name createdAt updatedAt", (error, categories) => {
        if (error) return res.status(500).json({message: "Error getting categories. Please try again later."});
        return res.status(200).json({message: "Categories retrieved successfully", count: categories.length, categories: categories});
    })
}