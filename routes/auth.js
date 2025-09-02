const express = require("express");
const bcrypt = require("bcrypt");
const Farmer = require("../models/Farmer");
const Buyer = require("../models/Buyer");

const router = express.Router();

/* -------------------- LOGIN: FARMER -------------------- */
router.post("/loginfarmer", async (req, res) => {
  const { email, password } = req.body;

  try {
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(401).json({ success: false, message: "❌ Farmer email not found" });
    }

    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "❌ Incorrect password" });
    }

    // ✅ Store logged-in user ID in session
  req.session.user = { id: farmer._id, name: farmer.name };

    res.json({ success: true, redirect: "/dashboardfarmer" });
  } catch (err) {
    console.error("❌ Farmer Login Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* -------------------- LOGIN: BUYER -------------------- */
router.post("/loginbuyer", async (req, res) => {
  const { email, password } = req.body;

  try {
    const buyer = await Buyer.findOne({ email });
    if (!buyer) {
      return res.status(401).json({ success: false, message: "❌ Buyer email not found" });
    }

    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "❌ Incorrect password" });
    }

    req.session.user = {
      role: "buyer",
      name: buyer.name,
      email: buyer.email,
      phone: buyer.phone
    };

    res.json({ success: true, redirect: "/dashboardbuyer" });
  } catch (err) {
    console.error("❌ Buyer Login Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* -------------------- SIGNUP: UNIFIED -------------------- */
router.post("/signup", async (req, res) => {
  const { name, email, phone, password, confirm_password, role } = req.body;

  try {
    // Validate role
    if (!["farmer", "buyer"].includes(role)) {
      return res.status(400).json({ success: false, message: "❌ Invalid role selected" });
    }

    // Check password match
    if (password !== confirm_password) {
      return res.status(400).json({ success: false, message: "❌ Passwords do not match" });
    }

    // Check for existing user
    let existingUser;
    if (role === "farmer") {
      existingUser = await Farmer.findOne({ email });
    } else {
      existingUser = await Buyer.findOne({ email });
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `❌ Email already registered as ${role}`
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare new user data
    const newUserData = { name, email, phone, password: hashedPassword };

    // For farmers, add a unique dbName
    if (role === "farmer") {
      newUserData.dbName = `farmer_${Date.now()}`;
    }

    // Create and save new user
    const newUser = new (role === "farmer" ? Farmer : Buyer)(newUserData);
    await newUser.save();

    // Store session
    req.session.user = {
      role,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      dbName: newUser.dbName || null
    };

    // Redirect URL
    const redirectUrl = role === "farmer" ? "/dashboardfarmer" : "/dashboardbuyer";
    res.json({ success: true, redirect: redirectUrl });

  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
