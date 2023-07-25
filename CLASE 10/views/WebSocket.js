// Implementación de las rutas para el manejo de productos
productsRouter.post('/', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
  
    // Emitir el evento 'newProduct' a todos los clientes conectados
    io.emit('newProduct', newProduct);
  
    res.status(201).json(newProduct);
  });
  