// Importa Express y define una instancia de la aplicación
const express = require('express');
const app = express();

// Simula una lista de usuarios (debes obtenerla de una base de datos)
const usuarios = [
    { id: 1, nombre: 'Usuario1', correo: 'usuario1@example.com', tipoCuenta: 'usuario' },
    { id: 2, nombre: 'Usuario2', correo: 'usuario2@example.com', tipoCuenta: 'admin' },
    // Agrega más usuarios
];

// Ruta para obtener todos los usuarios
app.get('/api/users', (req, res) => {
    const usuariosPrincipales = usuarios.map(user => ({
        nombre: user.nombre,
        correo: user.correo,
        tipoCuenta: user.tipoCuenta
    }));
    res.json(usuariosPrincipales);
});

// Escucha en un puerto
app.listen(3000, () => {
    console.log('Servidor en funcionamiento en el puerto 3000');
});
