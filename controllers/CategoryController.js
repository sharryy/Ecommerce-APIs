const Category = require('../models/Category');
const Product = require('../models/Product');
const {query} = require("express");

if (process.env.NODE_ENV === 'production') {
    require('dotenv').config();
}

exports.createCategory = async function (req, res, next) {
    //if category with same name already exists, return error
    const category = await Category.findOne({name: req.body.name});
    if (category) return res.status(400).json({success: false, message: 'Category with this name already exists'});

    const newCategory = new Category({name: req.body.name});
    newCategory.save((error, category) => {
        if (error) return res.status(500).json({
            success: false,
            message: "Error creating category. Please try again later."
        });
        return res.status(200).json({
            success: true,
            message: "Category created successfully",
            category: category
        });
    });
}

exports.getAllCategories = async function (req, res, next) {
    try {
        const data = await Category.find({}, "_id name createdAt updatedAt");
        const categories = data.map(category => {
            return {
                _id: category._id,
                name: category.name,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt
            }
        });
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            count: data.length,
            categories: categories
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting categories. Please try again later." + error.message
        });
    }
}

exports.getProductsOfCategory = async function (req, res, next) {
    try {
        const data = await Product.find({category_id: req.params.id}).populate({
            path: 'category_id',
            select: '_id name createdAt updatedAt'
        });
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Products retrieved successfully",
                count: data.length,
                products: data
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting products of category. Please try again later." + error.message
        });
    }
}