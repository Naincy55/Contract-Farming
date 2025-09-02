
const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  cropName: String,
  quantity: Number,
  harvestDate: Date,
  location: String,
  price: Number,
  img: String,




    // ✅ Link to farmer
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmer",
    required: true,
  }
  
});

module.exports = cropSchema;
