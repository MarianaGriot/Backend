// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
  role: { type: String, default: 'user' },
});

module.exports = mongoose.model('User', userSchema);
