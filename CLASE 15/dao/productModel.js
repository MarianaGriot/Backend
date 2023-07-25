const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Define los campos de tu esquema para la colección "products"
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
