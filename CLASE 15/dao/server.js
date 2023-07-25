const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const handlebars = require('express-handlebars');
const connectDb = require('./dao/mongoDb');
const Cart = require('./dao/models/cartModel');
const Message = require('./dao/models/messageModel');
const Product = require('./dao/models/productModel');

const PORT = 8080;

// Middleware para que Express pueda entender JSON en las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars como motor de plantillas
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Datos simulados para productos (reemplazar con una base de datos en un entorno de producción)
let products = [];

// Rutas para el manejo de productos
app.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('index', { products });
});

// Ruta para la vista en tiempo real de productos con WebSockets
app.get('/realtimeproducts', async (req, res) => {
  const products = await Product.find();
  res.render('realTimeProducts', { products });
});

// Configuración de WebSockets con socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado.');

  // Enviar la lista de productos a los clientes conectados cuando se conecten inicialmente
  socket.emit('updateProducts', products);

  // Manejo de eventos del socket
  socket.on('disconnect', () => {
    console.log('Cliente desconectado.');
  });

  // Evento para agregar un producto
  socket.on('addProduct', async (product) => {
    const newProduct = new Product(product);
    await newProduct.save();
    io.emit('updateProducts', products);
  });

  // Evento para eliminar un producto
  socket.on('removeProduct', async (productId) => {
    await Product.findByIdAndDelete(productId);
    io.emit('updateProducts', products);
  });
});

// Iniciar el servidor
connectDb().then(() => {
  http.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
