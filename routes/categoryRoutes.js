const express = require('express');
const Router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

Router.get("/", authMiddleware, categoryController.getAllCategories);
Router.post("/create",authMiddleware, categoryController.createCategory);
Router.get("/:id", authMiddleware, categoryController.getCategoryById);
Router.put("/update/:id",authMiddleware, categoryController.updateCategory);
Router.delete("/delete/:id",authMiddleware, categoryController.deleteCategory);

module.exports = Router;