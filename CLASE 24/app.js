// app.js
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const User = require('./models/user');
const jwt = require('jsonwebtoken');

// Configuración de Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la sesión en MongoDB (opcional si usas JWT)
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => console.log('Conexión exitosa a MongoDB'));

app.use(
  session({
    secret: 'mi_secreto_supersecreto',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
  })
);

// Configuración de Passport
app.use(passport.initialize());

// Ruta de registro de usuario (no se necesita en el caso de JWT)
app.post('/register', async (req, res) => {
  // ... Código para registrar un usuario (igual que antes) ...
});

// Ruta de inicio de sesión (no se necesita en el caso de JWT)
app.post('/login', async (req, res) => {
  // ... Código para iniciar sesión y generar el token JWT ...
});

// Ruta de perfil del usuario (requiere autenticación con JWT)
app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(`¡Hola, ${req.user.first_name}!`);
});

// Ruta de cierre de sesión (no se necesita en el caso de JWT)
app.get('/logout', (req, res) => {
  // ... Código para cerrar sesión (igual que antes) ...
});

// Ruta para obtener el usuario actual basado en el token JWT
app.get('/api/sessions/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

app.listen(3000, () => console.log('Servidor en ejecución en http://localhost:3000'));

