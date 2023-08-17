app.put('/api/users/premium/:uid', (req, res) => {
    const userId = req.params.uid;
  
    User.findByIdAndUpdate(userId, { role: 'premium' }, { new: true }, (err, updatedUser) => {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar el rol del usuario.' });
      }
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
  
      res.json({ message: 'Rol actualizado a premium.', user: updatedUser });
    });
  });
  