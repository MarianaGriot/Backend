const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000; // Puedes cambiar el puerto si lo deseas

const productManager = new ProductManager('products.json'); // Ajusta el nombre del archivo según tu caso

// Endpoint para obtener todos los productos con o sin límite
app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit); // Lee el valor del query param 'limit'

  let products;
  if (limit && limit > 0) {
    products = productManager.getProducts().slice(0, limit); // Obtén los primeros 'limit' productos
  } else {
    products = productManager.getProducts(); // Obtén todos los productos
  }

  res.json({ products });
});

// Endpoint para obtener un producto por su id (pid)
app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid); // Lee el valor del parámetro de la ruta (pid)

  const product = productManager.getProductById(productId);
  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
