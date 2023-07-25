// models/ticket.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  code: { type: String, unique: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: Number,
  purchaser: String,
});

module.exports = mongoose.model('Ticket', ticketSchema);
