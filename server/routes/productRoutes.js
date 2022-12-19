const express = require('express');
const { getAllproducts, getProductById} = require("../controller/productController");

const router = express.Router();


//@desc GET all products from db
//@route GET /api/products
//access Public

router.get('/', getAllproducts)


//@desc GET product by id from db
//@route GET /api/products/:id
//access Public

router.get('/:id', getProductById)


module.exports = router;