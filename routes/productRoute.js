const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

router.get('/product',productController.getAllProducts);
router.post('/product/new',productController.createProduct);
router.put('/product/:id',productController.updateProducts)
router.delete('/product/remove/:id',productController.deleteProduct)
router.get('/product/get/:id',productController.getProductDetails);




module.exports = router;
