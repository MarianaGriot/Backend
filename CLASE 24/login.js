// app.js (continuación)
// Función para generar el token JWT
function generateToken(user) {
    const payload = {
      sub: user.id,
      iat: Date.now(),
      // Puedes agregar más datos al payload si lo deseas
    };
    return jwt.sign(payload, jwtSecret, { expiresIn: '1d' }); // El token expirará después de 1 día
  }
  
  // Middleware para extraer el token de la cabecera de autorización (Bearer token)
  function extractToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      req.token = token;
    }
    next();
  }
  
  // Ruta de inicio de sesión y generación del token JWT
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'Correo electrónico no registrado' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
  
      const token = generateToken(user);
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  });
  
  // Agregamos el middleware para extraer el token de la cabecera de autorización en todas las solicitudes
  app.use(extractToken);
  