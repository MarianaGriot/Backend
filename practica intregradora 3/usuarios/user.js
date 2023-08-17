const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // ... otros campos del usuario
  role: {
    type: String,
    enum: ['user', 'premium'],
    default: 'user'
  }
});

const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
  // ... otros campos del producto
  owner: {
    type: String, // Puedes usar el correo electrónico o _id del usuario
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);


// Middleware para verificar permisos de modificación/eliminación de productos
function checkProductPermissions(req, res, next) {
    const productId = req.params.productId;
    const userId = req.user._id; // Supongo que tienes un middleware para autenticación
  
    Product.findById(productId, (err, product) => {
      if (err) {
        return res.status(500).json({ error: 'Error al buscar el producto.' });
      }
  
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
      }
  
      if (req.user.role === 'premium' && product.owner !== userId) {
        return res.status(403).json({ error: 'No tienes permisos para modificar/eliminar este producto.' });
      }
  
      next();
    });
  }
  
  // Ruta para eliminar un producto
  app.delete('/api/products/:productId', checkProductPermissions, (req, res) => {
    // Lógica para eliminar el producto
  });
  
  // Ruta para modificar un producto
  app.put('/api/products/:productId', checkProductPermissions, (req, res) => {
    // Lógica para modificar el producto
  });
  