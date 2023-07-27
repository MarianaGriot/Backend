// app.js
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const FactoryDAO = require('./dao/factoryDAO');
const UserRepository = require('./repository/userRepository');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de Passport y JWT (como se definió anteriormente)

// Middleware para extraer el token de la cabecera de autorización
function extractToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    req.token = token;
  }
  next();
}

// Ruta para obtener el usuario actual basado en el token JWT
app.get('/api/sessions/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Creamos el UserRepository con el DAO seleccionado (por ejemplo, 'mongo')
    const userRepository = new UserRepository(FactoryDAO.createDAO('mongo'));

    // Obtenemos el usuario por su ID a partir del JWT
    const user = await userRepository.findById(req.user.id);

    // Enviamos el DTO del usuario en la respuesta (sin información sensible)
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el usuario actual' });
  }
});

app.listen(3000, () => console.log('Servidor en ejecución en http://localhost:3000'));
