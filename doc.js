const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // Agrega la propiedad "documents" como un array de objetos
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
