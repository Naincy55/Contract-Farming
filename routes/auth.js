const express = require("express");
const bcrypt = require("bcrypt");
const Farmer = require("../models/Farmer");
const Buyer = require("../models/Buyer");

const router = express.Router();

/* =======================
   ✅ Login - Farmer
======================= */
router.post("/loginfarmer", async (req, res) => {
  const { email, password } = req.body;

  try {
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(401).json({ success: false, message: "❌ Farmer Email not found" });
    }

    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "❌ Incorrect password" });
    }

    // ✅ Store in session
    req.session.userId = farmer._id;
    req.session.user = {
      role: "farmer",
      name: farmer.name,
      email: farmer.email,
      phone: farmer.phone,
      dbName: farmer.dbName || null
    };

    // ✅ Send redirect path to frontend
    res.json({ success: true, redirect: "/dashboardfarmer" });

  } catch (err) {
    console.error("❌ Farmer Login Error:", err);
    res.status(500).json({ success: false, message: "❌ Server error" });
  }
});

/* =======================
   ✅ Login - Buyer
======================= */
router.post("/loginbuyer", async (req, res) => {
  const { email, password } = req.body;

  try {
    const buyer = await Buyer.findOne({ email });
    if (!buyer) {
      return res.status(401).json({ success: false, message: "❌ Buyer Email not found" });
    }

    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "❌ Incorrect password" });
    }

    req.session.userId = buyer._id;
    req.session.user = {
      role: "buyer",
      name: buyer.name,
      email: buyer.email,
      phone: buyer.phone
    };

    res.json({ success: true, redirect: "/dashboardbuyer" });

  } catch (err) {
    console.error("❌ Buyer Login Error:", err);
    res.status(500).json({ success: false, message: "❌ Server error" });
  }
});

/* =======================
   ✅ Signup - Unified
======================= */
router.post("/signup", async (req, res) => {
  const { name, email, phone, password, confirm_password, role } = req.body;

  if (password !== confirm_password) {
    return res.json({ success: false, message: "❌ Passwords do not match" });
  }

  try {
    let existingUser;
    if (role === "farmer") {
      existingUser = await Farmer.findOne({ email });
    } else if (role === "buyer") {
      existingUser = await Buyer.findOne({ email });
    }

    if (existingUser) {
      return res.json({
        success: false,
        message: `❌ Email already registered as ${role}`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = { name, email, phone, password: hashedPassword };

    if (role === "farmer") {
      newUserData.dbName = `farmer_${Date.now()}`;
    }

    const newUser = new (role === "farmer" ? Farmer : Buyer)(newUserData);
    await newUser.save();

    req.session.user = {
      role,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      dbName: newUser.dbName || null
    };

    const redirectUrl = role === "farmer" ? "/dashboardfarmer" : "/dashboardbuyer";
    res.json({ success: true, redirect: redirectUrl });

  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ success: false, message: "❌ Server Error" });
  }
});


module.exports = router;
