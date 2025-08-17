const express = require("express");
const multer = require("multer");
const path = require("path");
const Crop = require("../models/Crop");

const router = express.Router();

// ✅ Multer setup to store images in uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

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
      img: req.file.filename ,// ONLY filename
      farmerId:req.session.user.id
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

    // // (Optional) also delete the file from disk
    // if (doc?.img) {
    //   const filePath = path.join(UPLOADS_DIR, doc.img);
    //   fs.unlink(filePath, () => {}); // ignore errors on unlink
    // }

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

    const cropsWithPaths = crops.map(c => ({
      ...c._doc,
      img: c.img ? `/uploads/${c.img}` : null  // Prepend /uploads/
    }));

    res.json({ success: true, crops: cropsWithPaths });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Failed to load crops" });
  }
});


// ✅ Get crops for logged-in user
// ✅ Get only logged-in farmer's crops
router.get("/my-crops", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }

    // assuming you stored farmer's _id in crop schema as farmerId
    const crops = await Crop.find({ farmerId: req.session.user.id });

    res.json({ success: true, crops });
  } catch (err) {
    console.error("❌ Error fetching crops:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});




module.exports = router;
