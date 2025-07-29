const express = require("express");
const Student = require("../models/Student");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Get all students
router.get("/", authMiddleware, async (req, res) => {
  const students = await Student.findAll();
  res.json(students);
});

// Add a student
router.post("/", authMiddleware, async (req, res) => {
  const { name, email, grade, section } = req.body;
  try {
    const student = await Student.create({ name, email, grade, section });
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: "Failed to create student", error: err.message });
  }
});

// Delete student
router.delete("/:id", authMiddleware, async (req, res) => {
  await Student.destroy({ where: { id: req.params.id } });
  res.json({ message: "Student deleted" });
});

module.exports = router;