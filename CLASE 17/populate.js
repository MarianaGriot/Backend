cartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;
  
    try {
      const cart = await Cart.findById(cid).populate('products.product', 'title price');
  
      if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado.' });
      }
  
      res.json({ status: 'success', payload: cart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error al obtener el carrito.' });
    }
  });
  