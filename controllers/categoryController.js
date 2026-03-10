const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name,description } = req.body || { };

        // simple controller validation
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }
        if (!description) {
            return res.status(400).json({
                message: "Description is required"
            });
        }

        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
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

const updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body || { };

        // simple controller validation
        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }
        if (!description) {
            return res.status(400).json({
                message: "Description is required"
            });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(updatedCategory);
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

const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};