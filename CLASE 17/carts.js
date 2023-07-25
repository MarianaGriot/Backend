// DELETE api/carts/:cid/products/:pid
cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
  
    try {
      const cart = await Cart.findById(cid);
  
      if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado.' });
      }
  
      cart.products = cart.products.filter((product) => product.product.toString() !== pid);
      await cart.save();
  
      res.json({ status: 'success', message: 'Producto eliminado del carrito.' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error al eliminar el producto del carrito.' });
    }
  });
  
  // PUT api/carts/:cid
  cartsRouter.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
  
    try {
      const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true });
  
      if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado.' });
      }
  
      res.json({ status: 'success', payload: cart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error al actualizar el carrito.' });
    }
  });
  
  // PUT api/carts/:cid/products/:pid
  cartsRouter.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
  
    try {
      const cart = await Cart.findById(cid);
  
      if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado.' });
      }
  
      const productIndex = cart.products.findIndex((product) => product.product.toString() === pid);
  
      if (productIndex === -1) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito.' });
      }
  
      cart.products[productIndex].quantity = quantity;
      await cart.save();
  
      res.json({ status: 'success', payload: cart });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error al actualizar la cantidad del producto en el carrito.' });
    }
  });
  
  // DELETE api/carts/:cid
  cartsRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
  
    try {
      const cart = await Cart.findByIdAndDelete(cid);
  
      if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Carrito no encontrado.' });
      }
  
      res.json({ status: 'success', message: 'Carrito eliminado correctamente.' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error al eliminar el carrito.' });
    }
  });
  