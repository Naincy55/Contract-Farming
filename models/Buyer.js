const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String
});

module.exports = mongoose.model('Buyer', buyerSchema, 'buyers'); // collection name = buyers
