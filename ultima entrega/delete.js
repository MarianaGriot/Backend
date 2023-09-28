const nodemailer = require('nodemailer');

// ...

// Ruta para eliminar usuarios inactivos
app.delete('/api/users', (req, res) => {
    const tiempoInactividad = 30 * 60 * 1000; // 30 minutos (cambia esto según tus necesidades)
    const tiempoActual = new Date().getTime();

    const usuariosActivos = usuarios.filter(user => {
        if (user.ultimaConexion && tiempoActual - user.ultimaConexion <= tiempoInactividad) {
            return true;
        } else {
            // Envía un correo electrónico al usuario
            enviarCorreoEliminacion(user.correo);
            return false;
        }
    });

    usuarios.length = 0;
    Array.prototype.push.apply(usuarios, usuariosActivos);

    res.send('Usuarios inactivos eliminados');
});

function enviarCorreoEliminacion(correoUsuario) {
    // Configura y envía un correo electrónico al usuario aquí (usando nodemailer, por ejemplo)
    // Debe informar al usuario que su cuenta ha sido eliminada por inactividad
}

// ...
