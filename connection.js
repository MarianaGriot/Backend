const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_connection: Date, // Agrega la propiedad "last_connection" como una fecha
});

const User = mongoose.model('User', userSchema);

module.exports = User;


const User = require('./userModel'); // Reemplaza la ruta con la ubicación real de tu modelo de usuario

// Controlador de inicio de sesión
const loginController = (req, res) => {
  // Realiza la autenticación del usuario aquí
  // ...

  // Actualiza "last_connection" para el usuario autenticado
  User.findByIdAndUpdate(
    req.user._id, // Suponiendo que tienes el usuario autenticado en req.user
    { $set: { last_connection: new Date() } },
    (err) => {
      if (err) {
        console.error('Error al actualizar last_connection:', err);
      } else {
        console.log('Fecha de last_connection actualizada con éxito.');
      }
    }
  );

  // Envía una respuesta de inicio de sesión exitoso
  // ...
};
