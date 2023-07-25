const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  // Define los campos de tu esquema para la colección "messages"
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
