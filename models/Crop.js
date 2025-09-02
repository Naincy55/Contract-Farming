const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  cropName: String,
  quantity: Number,
  harvestDate: Date,
  location: String,
  price: Number,
  img: String,
   farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true } // ✅ correct field
});



module.exports = mongoose.model("Crop", cropSchema, "crops");
