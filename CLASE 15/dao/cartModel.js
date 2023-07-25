const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  // Define los campos de tu esquema para la colección "carts"
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
