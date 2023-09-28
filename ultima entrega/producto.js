const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Definir un array de productos (simulado)
const productos = [
    { id: 1, nombre: 'Producto1', propietarioId: 1, esPremium: false },
    { id: 2, nombre: 'Producto2', propietarioId: 2, esPremium: true },
    // Agregar más productos
];

// Ruta para eliminar un producto por su ID
app.delete('/api/products/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);

    const producto = productos.find(p => p.id === productId);

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Verificar si el producto pertenece a un usuario premium
    if (producto.esPremium) {
        // Enviar un correo electrónico al propietario del producto
        const propietarioId = producto.propietarioId;
        const correoPropietario = obtenerCorreoUsuario(propietarioId);
        enviarCorreoEliminacionProductoPremium(correoPropietario);
    }

    // Eliminar el producto de la lista
    const indice = productos.indexOf(producto);
    productos.splice(indice, 1);

    res.json({ mensaje: 'Producto eliminado correctamente' });
});

// Función para obtener el correo del usuario por su ID (simulada)
function obtenerCorreoUsuario(userId) {
    // Simulación de obtención de correo desde una base de datos
    // En un sistema real, esto debería consultar una base de datos
    const usuarios = [
        { id: 1, correo: 'usuario1@example.com' },
        { id: 2, correo: 'usuario2@example.com' },
        // Agregar más usuarios
    ];

    const usuario = usuarios.find(u => u.id === userId);
    return usuario ? usuario.correo : null;
}

// Función para enviar un correo de eliminación de producto premium
function enviarCorreoEliminacionProductoPremium(correo) {
    // Configurar y enviar un correo electrónico al usuario aquí
    // Avisa al usuario que su producto premium ha sido eliminado
}

app.listen(3000, () => {
    console.log('Servidor en funcionamiento en el puerto 3000');
});
