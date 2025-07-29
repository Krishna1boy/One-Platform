const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Get all users (Admin only)
router.get("/users", authMiddleware, async (req, res) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  res.json(users);
});

// Add new user
router.post("/users", authMiddleware, async (req, res) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete user
router.delete("/users/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
