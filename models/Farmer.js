const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
 
  name: String,
  email: String,
  phone: String,
  password: String,
}, { timestamps: false });


module.exports = mongoose.model('Farmer', farmerSchema, 'farmers'); // collection name = farmers
