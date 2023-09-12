const express = require('express');
const multer = require('multer');
const User = require('../models/user'); // Importa tu modelo de usuario

const router = express.Router();

// Configura Multer para guardar archivos en carpetas diferentes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { uid } = req.params;
    const { fileType } = req.body; // Agrega un campo en tu solicitud para indicar el tipo de archivo
    let uploadPath = '';

    if (fileType === 'profile') {
      uploadPath = `uploads/profiles/${uid}`;
    } else if (fileType === 'product') {
      uploadPath = `uploads/products/${uid}`;
    } else if (fileType === 'document') {
      uploadPath = `uploads/documents/${uid}`;
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Ruta POST para cargar documentos
router.post('/:uid/documents', upload.array('documents'), async (req, res) => {
  const { uid } = req.params;
  const { files } = req;

  try {
    // Actualiza el estado del usuario para indicar que ha subido documentos
    const user = await User.findByIdAndUpdate(
      uid,
      { $set: { hasUploadedDocuments: true } },
      { new: true }
    );

    res.status(200).json({ message: 'Documentos cargados exitosamente', user });
  } catch (error) {
    console.error('Error al cargar documentos:', error);
    res.status(500).json({ error: 'Error al cargar documentos' });
  }
});

module.exports = router;



const express = require('express');
const User = require('../models/user'); // Importa tu modelo de usuario

const router = express.Router();

// Ruta para actualizar a un usuario a premium si ha cargado documentos requeridos
router.put('/premium/:uid', async (req, res) => {
  const { uid } = req.params;
  
  try {
    // Busca al usuario por su ID
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verifica si el usuario ha cargado los documentos requeridos
    if (
      user.documents.some(doc => doc.name === 'Identificación') &&
      user.documents.some(doc => doc.name === 'Comprobante de domicilio') &&
      user.documents.some(doc => doc.name === 'Comprobante de estado de cuenta')
    ) {
      // Actualiza al usuario a premium
      user.isPremium = true;

      // Guarda los cambios
      await user.save();

      return res.status(200).json({ message: 'Usuario actualizado a premium' });
    } else {
      return res.status(400).json({ error: 'El usuario no ha cargado todos los documentos requeridos' });
    }
  } catch (error) {
    console.error('Error al actualizar usuario a premium:', error);
    res.status(500).json({ error: 'Error al actualizar usuario a premium' });
  }
});

module.exports = router;
