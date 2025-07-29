const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
const Student = require("../models/Student");
const authMiddleware = require("../middlewares/authMiddleware");

// Add exam record
router.post("/", authMiddleware, async (req, res) => {
  const { studentId, subject, marksObtained, totalMarks, examDate } = req.body;
  try {
    const exam = await Exam.create({
      StudentId: studentId,
      subject,
      marksObtained,
      totalMarks,
      examDate,
    });
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ message: "Error creating exam", error: err.message });
  }
});

// Get all exams
router.get("/", authMiddleware, async (req, res) => {
  try {
    const exams = await Exam.findAll({
      include: [{ model: Student }],
      order: [["examDate", "DESC"]],
    });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: "Error fetching exams" });
  }
});

module.exports = router;
