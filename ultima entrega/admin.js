// Middleware personalizado para verificar si el usuario es administrador
function verificarAdmin(req, res, next) {
    if (req.user && req.user.tipoCuenta === 'admin') {
        // El usuario es un administrador, permite el acceso
        return next();
    } else {
        // El usuario no es un administrador, redirige o muestra un error
        res.status(403).send('Acceso denegado');
    }
}

// Ruta para la vista de administrador (accesible solo para administradores)
app.get('/admin', verificarAdmin, (req, res) => {
    // Aquí puedes renderizar la vista de administrador
    res.send('Vista de administrador');
});

// ...
