const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const PORT = 8080;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Definición del modelo de Producto
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
});

const Product = mongoose.model('Product', productSchema);

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

// Ruta
