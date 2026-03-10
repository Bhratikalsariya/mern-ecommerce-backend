const Category = require('../models/Category');
const Products = require('../models/Products');
const fs = require("fs");
const path = require("path");

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price,category,stock } = req.body || { };

        // simple controller validation
        if (!name) {
            return res.status(400).json({
                message: "Name field are required"
            });
        }
        if (!description) {
            return res.status(400).json({
                message: "Description field are required"
            });
        }
        if (!price) {
            return res.status(400).json({
                message: "Price field are required"
            });
        }
        if (!category) {
            return res.status(400).json({
                message: "Category field are required"
            });
        }
        if (!stock) {
            return res.status(400).json({
                message: "Stock field are required"
            });
        }

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(400).json({
                message: "Category does not exist"
            });
        }

        const imagesName = req.files.map(file => file.filename);

        const newProduct = new Products({ name, description, price, category, images: imagesName, stock });
        await newProduct.save();
        const product = await Products.findById(newProduct._id).populate("category", "name description");
        res.status(201).json(product);
    } catch (err) {
        // Mongoose validation error
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: err.message
            });
        }

        res.status(500).json({ message: err.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price,category,stock } = req.body || { };

        // simple controller validation
        if (!name) {
            return res.status(400).json({
                message: "Name field are required"
            });
        }
        if (!description) {
            return res.status(400).json({
                message: "Description field are required"
            });
        }
        if (!price) {
            return res.status(400).json({
                message: "Price field are required"
            });
        }
        if (!category) {
            return res.status(400).json({
                message: "Category field are required"
            });
        }
        if (!stock) {
            return res.status(400).json({
                message: "Stock field are required"
            });
        }

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(400).json({
                message: "Category does not exist"
            });
        }

        const productExists = await Products.findById(req.params.id);

        if (!productExists) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        let imagesName = productExists.images;

        // if new images uploaded
        if (req.files && req.files.length > 0) {

            // delete only this product images
            for (const img of productExists.images) {

                const filePath = path.join(process.cwd(), "uploads", img);

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            // save new images
            imagesName = req.files.map(file => file.filename);
        }

        const product = await Products.findByIdAndUpdate(
            req.params.id,
            {  ...req.body,
                images: imagesName
            },
            { new: true }
        );
        const productData = await Products.findById(product._id).populate("category", "name description");
        res.status(200).json(productData);
    } catch (err) {
        // Mongoose validation error
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: err.message
            });
        }

        res.status(500).json({ message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        if (product.images && product.images.length > 0) {

            for (const img of product.images) {

                const filePath = path.join(process.cwd(), "uploads", img);

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }

            }
        }

        // delete product
        await Products.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};