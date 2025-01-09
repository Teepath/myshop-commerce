const Product = require('../models/Product');

const getAllproducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "createdAt", order = "desc", category } = req.query;

    const filter = category ? { category } : {}; // Filter by category if provided
    const sortOrder = order === "asc" ? 1 : -1; // Sort ascending or descending

    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ [sort]: sortOrder }) // Dynamic sorting
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    res.status(200).json({
      status: "success",
      totalProducts,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}



/* CREATE PRODUCT */
const createProduct = async (req, res) => {
    try {
      const { name, description, price, category, countInStock, imageUrl, currency } = req.body;
  
      const newProduct = new Product({
        name,
        currency,
        description,
        price,
        category,
        countInStock,
        imageUrl,
      });
  
      const savedProduct = await newProduct.save();
      res.status(201).json({message:"success", data:savedProduct});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create product" });
    }
  };

const getProductById = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        res.json({message:"success", data:products});
    } catch (error) {
        res.status(500).json({message: 'server error'})
    }
}


const getProductByCategory = async (req, res) => {
    try {
        const products = await Product.findOne({category: req.params.category})
        res.status(201).json({message:"success", data:products})
    } catch (error) {
        console.error(500).json({message: 'server error'})
    }
}


const updateProduct = async (req, res) => {

/* UPDATE PRODUCT */
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
      if (!updatedProduct)
        return res.status(404).json({ message: "Product not found" });
      res.status(201).json({message:"success", data:updatedProduct});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update product" });
    }

}



/* DELETE PRODUCT */
const deleteProduct = async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct)
        return res.status(404).json({ message: "Product not found" });
      res.status(201).json({ message: "Product deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete product" });
    }
  }
  

module.exports = {
    getAllproducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByCategory,
  };
