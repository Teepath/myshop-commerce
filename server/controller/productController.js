const Product = require('../models/Product');

const getAllproducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products);
    } catch (error) {
        console.error(500).json({message: 'server error'})
    }
}

const getProductById = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        res.json(products);
    } catch (error) {
        console.error(500).json({message: 'server error'})
    }
}

module.exports = {
    getAllproducts,
    getProductById
}