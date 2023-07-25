const express = require('express');
const app = express();
const PORT = 8080;

// Middleware para que Express pueda entender JSON en las solicitudes
app.use(express.json());

// Rutas para el manejo de productos
const productsRouter = express.Router();
app.use('/api/products', productsRouter);

// Rutas para el manejo de carritos
const cartsRouter = express.Router();
app.use('/api/carts', cartsRouter);

// Datos simulados para productos y carritos (reemplazar con una base de datos en un entorno de producción)
let products = [];
let carts = [];

// Implementación de las rutas para el manejo de productos
productsRouter.get('/', (req, res) => {
  res.json(products);
});

productsRouter.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const product = products.find((p) => p.id === pid);

  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  res.json(product);
});

productsRouter.post('/', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

productsRouter.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;
  const index = products.findIndex((p) => p.id === pid);

  if (index === -1) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  // Evitar actualizar el ID
  updatedProduct.id = products[index].id;
  products[index] = updatedProduct;

  res.json(updatedProduct);
});

productsRouter.delete('/:pid', (req, res) => {
  const { pid } = req.params;
  products = products.filter((p) => p.id !== pid);
  res.json({ message: 'Producto eliminado correctamente' });
});

// Implementación de las rutas para el manejo de carritos
cartsRouter.post('/', (req, res) => {
  const newCart = req.body;
  newCart.id = generateRandomId();
  carts.push(newCart);
  res.status(201).json(newCart);
});

cartsRouter.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const cart = carts.find((c) => c.id === cid);

  if (!cart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }

  res.json(cart.products);
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const cart = carts.find((c) => c.id === cid);
  const product = products.find((p) => p.id === pid);

  if (!cart || !product) {
    return res.status(404).json({ message: 'Carrito o producto no encontrado' });
  }

  const cartProduct = { product: pid, quantity };
  cart.products.push(cartProduct);

  res.status(201).json(cartProduct);
});

// Función para generar un ID aleatorio (en un entorno de producción, utilizar un método más robusto)
function generateRandomId() {
  return Math.random().toString(36).substring(7);
}

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
