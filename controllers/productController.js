// controllers/productController.js
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    let { category, name, sort, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (name) filter.name = new RegExp(name, 'i');

    let query = Product.find(filter);
    if (sort) query = query.sort(sort.split(',').join(' '));
    query = query.skip((page - 1) * limit).limit(Number(limit));

    const products = await query;
    const totalRecords = await Product.countDocuments(filter);
    res.json({
      products,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      page: Number(page),
      limit: Number(limit)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};