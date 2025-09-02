const express = require("express");
const multer = require("multer");
const path = require("path");
const Crop = require("../models/Crop");

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// ========================
// Get logged-in farmer info
// ========================
router.get("/me", (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: "Not logged in" });
  res.json(req.session.user);
});

// ========================
// Get all crops for logged-in farmer
// ========================
router.get("/crops", async (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: "Not logged in" });

  try {
    const crops = await Crop.find({ farmer: req.session.user._id }).sort({ createdAt: -1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========================
// Add a new crop
// ========================
router.post("/crops", upload.single("cropImage"), async (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: "Not logged in" });

  try {
    const { cropName, cropQty, cropPrice, harvestDate } = req.body;
    const imagePath = req.file ? "/uploads/" + req.file.filename : null;

    const crop = new Crop({
      name: cropName,
      quantity: cropQty,
      pricePerKg: cropPrice,
      harvestDate: harvestDate || null,
      image: imagePath,
      farmer: req.session.user._id
    });

    await crop.save();
    res.json({ success: true, crop });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
