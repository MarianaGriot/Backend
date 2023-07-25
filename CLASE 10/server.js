const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const handlebars = require('express-handlebars');

const PORT = 8080;

// Middleware para que Express pueda entender JSON en las solicitudes
app.use(express.json());

// Configuración de Handlebars como motor de plantillas
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

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
// ... (código de las rutas para productos, igual que antes)

// Implementación de las rutas para el manejo de carritos
// ... (código de las rutas para carritos, igual que antes)

// Configuración de WebSockets con socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado.');

  // Manejo de eventos del socket
  socket.on('disconnect', () => {
    console.log('Cliente desconectado.');
  });
});

// Ruta para la página principal que renderiza los productos con Handlebars
app.get('/', (req, res) => {
  res.render('products', { products });
});

// Iniciar el servidor
http.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
