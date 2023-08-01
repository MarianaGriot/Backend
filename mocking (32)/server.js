const express = require('express');
const app = express();

// Endpoint para el Mocking de productos
app.get('/mockingproducts', (req, res) => {
  // Generar 100 productos ficticios
  const products = generateMockProducts(100);

  // Enviar los productos como respuesta
  res.json(products);
});

// Función para generar productos ficticios
function generateMockProducts(quantity) {
  const products = [];
  for (let i = 1; i <= quantity; i++) {
    const product = {
      _id: `product_${i}`,
      name: `Product ${i}`,
      price: Math.random() * 1000,
      category: `Category ${Math.floor(Math.random() * 5) + 1}`,
    };
    products.push(product);
  }
  return products;
}

// Inicializar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
