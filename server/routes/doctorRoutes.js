const express = require("express");
const router = express.Router();
const { User } = require("../models");

// GET /api/doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await User.findAll({
      where: { role: "Doctor" },
      attributes: ["id", "name", "specialization"]
    });
    res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
