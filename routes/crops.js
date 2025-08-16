const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Crop = require("../models/Crop");

const router = express.Router();

// Use an absolute path for reliability
const UPLOADS_DIR = path.resolve(__dirname, "..", "uploads");

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// (Optional but recommended) accept only images, size limit ~5MB
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\//.test(file.mimetype)) return cb(null, true);
    cb(new Error("Only image files are allowed"));
  }
});

// POST /crops/add
router.post("/add", upload.single("cropImage"), async (req, res) => {
  try {
    const { cropName, quantity, harvestDate, location, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const crop = new Crop({
      cropName,
      quantity,
      harvestDate: harvestDate ? new Date(harvestDate) : null,
      location,
      price,
      img: req.file.filename, // store only filename
      farmerId: req.session?.userId || null
    });

    await crop.save();
    res.json({ success: true, message: "Crop added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE /crops/:id
router.delete("/:id", async (req, res) => {
  try {
    const cropId = req.params.id;
    const doc = await Crop.findByIdAndDelete(cropId);

    // (Optional) also delete the file from disk
    if (doc?.img) {
      const filePath = path.join(UPLOADS_DIR, doc.img);
      fs.unlink(filePath, () => {}); // ignore errors on unlink
    }

    res.json({ success: true, message: "Crop deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error deleting crop" });
  }
});

// GET /crops - fetch all crops
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find();

    const cropsWithPaths = crops.map((c) => {
      const obj = c.toObject();
      obj.img = c.img ? `/uploads/${c.img}` : null; // prepend the public URL
      return obj;
    });

    res.json({ success: true, crops: cropsWithPaths });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to load crops" });
  }
});

module.exports = router;
