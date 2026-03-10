const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes in this router
router.use(authMiddleware);

router.get("/", productsController.getAllProducts);
router.post("/create", upload.array("images", 20), productsController.createProduct);
router.get("/:id", productsController.getProductById);
router.put("/update/:id", upload.array("images", 20), productsController.updateProduct);
router.delete("/delete/:id", productsController.deleteProduct);

module.exports = router;