router.post('/login', async (req, res) => {
    // ... (código de inicio de sesión)
    if (validPassword) {
      req.session.user = user;
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
      // Si deseas redirigir a la vista de productos:
      // res.redirect('/products');
    }
    // ...
  });
  