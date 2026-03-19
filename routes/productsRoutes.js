const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get("/", productsController.getAllProducts);
router.post("/create",authMiddleware, upload.array("images", 20), productsController.createProduct);
router.get("/:id", productsController.getProductById);
router.put("/update/:id", authMiddleware,upload.array("images", 20), productsController.updateProduct);
router.delete("/delete/:id",authMiddleware, productsController.deleteProduct);
router.get("/category/:categoryId",authMiddleware,productsController.getProductsByCategory);

module.exports = router;