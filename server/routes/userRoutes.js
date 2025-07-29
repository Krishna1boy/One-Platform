const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users or filter by role (e.g., Employee)
router.get("/", async (req, res) => {
  try {
    const { role } = req.query;
    const where = role ? { role } : {};
    const users = await User.findAll({ where });
    res.json(users);
  } catch (err) {
    console.error("Error loading users:", err);
    res.status(500).json({ message: "Failed to load users" });
  }
});


module.exports = router;