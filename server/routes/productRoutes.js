const express = require('express');
const protect = require('../middleware/auth');
const restrictTo = require('../utils/restrict')
const { getAllproducts, getProductById,   createProduct, updateProduct, deleteProduct,  getProductByCategory} = require("../controller/productController");

const router = express.Router();


//@desc GET all products from db
//@route GET /api/products
//access Public

router.get('/all', getAllproducts)
router.post('/', protect, restrictTo('admin', 'superadmin'), createProduct);
router.put('/:id', protect, restrictTo('admin', 'superadmin'), updateProduct);
router.delete('/:id', protect, restrictTo('admin', 'superadmin'), deleteProduct);
router.get('/category', protect, restrictTo('admin', 'superadmin'), getProductByCategory);


//@desc GET product by id from db
//@route GET /api/products/:id
//access Public

router.get('/:id', getProductById)


module.exports = router;