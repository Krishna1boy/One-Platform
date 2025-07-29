const express = require("express");
const router = express.Router();
const Patient  = require("../models/Patient");
const verifyToken = require("../middlewares/authMiddleware");

// Add new patient
router.post("/", verifyToken, async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ error: "Failed to create patient" });
  }
});

// Get all patients
router.get("/", verifyToken, async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
});

module.exports = router;
