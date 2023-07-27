// routes/carts.js
const express = require('express');
const router = express.Router();
const authorizationMiddleware = require('../middleware/authorizationMiddleware');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Ticket = require('../models/ticket');

// Ruta para finalizar la compra de un carrito
router.post('/:cid/purchase', authorizationMiddleware('user'), async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId).populate('products.product');

    const productsToPurchase = [];
    const productsNotPurchased = [];

    for (const product of cart.products) {
      const availableStock = product.product.stock;
      if (product.quantity <= availableStock) {
        // Si hay suficiente stock para la cantidad en el carrito, realizar la compra
        productsToPurchase.push({ product: product.product, quantity: product.quantity });
        product.product.stock -= product.quantity;
        await product.product.save();
      } else {
        // Si no hay suficiente stock, dejarlo en el carrito sin comprar
        productsNotPurchased.push(product.product._id);
      }
    }

    // Actualizar el carrito con los productos no comprados
    cart.products = cart.products.filter(
      (product) => !productsNotPurchased.includes(product.product)
    );
    await cart.save();

    // Crear el ticket con los productos comprados
    const amount = productsToPurchase.reduce(
      (total, product) => total + product.product.price * product.quantity,
      0
    );
    const ticket = new Ticket({
      code: generateUniqueTicketCode(),
      amount,
      purchaser: req.user.email,
    });
    await ticket.save();

    res.json({ success: true, ticketId: ticket._id, productsNotPurchased });
  } catch (err) {
    res.status(500).json({ message: 'Error al procesar la compra' });
  }
});

// Función para generar un código único para el ticket
function generateUniqueTicketCode() {
  // ... Implementación para generar un código único ...
}

module.exports = router;
