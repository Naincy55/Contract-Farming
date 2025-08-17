const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const authRoutes = require("./routes/auth"); // ✅ Import routes
const cropRoutes = require("./routes/crops");

const app = express();
const PORT = 3000;

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/userdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Middleware
app.use(session({
  secret: "your-secret-key", // use env var in production
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, "public")));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));




app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ✅ Serve HTML Pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/loginfarmer", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "loginfarmer.html"));
});
app.get("/loginbuyer", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "loginbuyer.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "contact.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "about.html"));
});
app.get("/newaccountfar", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "newaccountfar.html"));
});
app.get("/newaccountbuy", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "newaccountbuy.html"));
});
app.get("/dashboardfarmer", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "dashboardfarmer.html"));
});
app.get("/dashboardbuyer", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "dashboardbuyer.html"));
});

// ✅ Logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
    }
    res.redirect("/loginfarmer");
  });
});

// ✅ Get logged in user info
app.get("/api/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }
  res.json(req.session.user);
});

// ✅ Use Auth Routes
app.use("/auth", authRoutes); // All signup/login routes
app.use("/crops", cropRoutes);  // → crop add/view routes

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
