app.post('/api/cart/add', (req, res) => {
    const productId = req.body.productId;
    const userId = req.user._id; // Supongo que tienes un middleware para autenticación
  
    Product.findById(productId, (err, product) => {
      if (err || !product) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
      }
  
      if (req.user.role === 'premium' && product.owner === userId) {
        return res.status(400).json({ error: 'No puedes agregar tu propio producto al carrito.' });
      }
  
      // Lógica para agregar el producto al carrito
    });
  });
  