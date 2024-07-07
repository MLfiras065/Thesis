const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProduct);
router.delete('/products/:id', productController.deleteProduct);
router.put('/products/:id', productController.updateProduct);

module.exports = router;
