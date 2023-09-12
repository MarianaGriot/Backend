const User = require('./userModel'); // Reemplaza la ruta con la ubicación real de tu modelo de usuario

// Crear un nuevo usuario con documentos
const newUser = new User({
  username: 'ejemplo',
  email: 'ejemplo@example.com',
  password: 'contraseña',
  documents: [
    {
      name: 'Documento 1',
      reference: 'https://ejemplo.com/documento1',
    },
    {
      name: 'Documento 2',
      reference: 'https://ejemplo.com/documento2',
    },
  ],
});

// Guardar el usuario en la base de datos
newUser.save((err) => {
  if (err) {
    console.error('Error al guardar el usuario:', err);
  } else {
    console.log('Usuario guardado con éxito.');
  }
});
