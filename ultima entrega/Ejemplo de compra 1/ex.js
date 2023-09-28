const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware para parsear JSON en las solicitudes
app.use(bodyParser.json());

// Base de datos simulada para productos y pedidos
const productos = [
  { id: 1, nombre: 'Producto 1', precio: 10.99 },
  { id: 2, nombre: 'Producto 2', precio: 19.99 },
  { id: 3, nombre: 'Producto 3', precio: 7.99 },
];

const carrito = [];

// Ruta para obtener todos los productos disponibles
app.get('/productos', (req, res) => {
  res.status(200).json({ productos });
});

// Ruta para agregar un producto al carrito de compra
app.post('/agregar-al-carrito', (req, res) => {
  const { productoId, cantidad } = req.body;
  const producto = productos.find((p) => p.id === productoId);

  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  carrito.push({ producto, cantidad });
  res.status(200).json({ mensaje: 'Producto agregado al carrito', carrito });
});

// Ruta para ver el contenido del carrito de compra
app.get('/carrito', (req, res) => {
  res.status(200).json({ carrito });
});

// Ruta para realizar un pedido
app.post('/realizar-pedido', (req, res) => {
  // Aquí podrías implementar la lógica de procesamiento de pagos y gestión de pedidos.
  // Por simplicidad, simulamos un pedido vacío en este ejemplo.
  const pedido = {
    id: Date.now(),
    productos: [...carrito],
    total: carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0),
  };

  carrito.length = 0; // Vaciar el carrito después de realizar el pedido

  res.status(200).json({ mensaje: 'Pedido realizado con éxito', pedido });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
