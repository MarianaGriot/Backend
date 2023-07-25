router.get('/products', (req, res) => {
    // Verificar si el usuario está autenticado
    if (!req.session.user) {
      return res.status(401).json({ error: 'Debe iniciar sesión para ver esta página' });
    }
    
    // Obtener los datos del usuario desde la sesión
    const { email, role } = req.session.user;
    
    // Mostrar mensaje de bienvenida con los datos del usuario
    res.status(200).json({ message: `Bienvenido, ${email}. Rol: ${role}` });
  });
  