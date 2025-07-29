const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const authMiddleware = require("../middlewares/authMiddleware");

// Add/mark attendance
// router.post("/", authMiddleware, async (req, res) => {
//   const { studentId, date, status } = req.body;

//   try {
//     const record = await Attendance.create({
//       StudentId: studentId, // ✅ Make sure key matches your foreignKey
//       date,
//       status,
//     });

//     res.status(201).json(record);
//   } catch (err) {
//     res.status(500).json({ message: "Error marking attendance", error: err.message });
//   }
// });
// routes/attendanceRoutes.js

router.post("/", authMiddleware, async (req, res) => {
  const { studentId, date, status } = req.body;

  try {
    // Check if attendance already exists for this student on this date
    const existing = await Attendance.findOne({
      where: {
        StudentId: studentId,
        date: date,
      },
    });

    if (existing) {
      return res.status(400).json({ message: "Attendance already marked for this student on this date." });
    }

    // Create attendance if not already exists
    const record = await Attendance.create({
      StudentId: studentId,
      date,
      status,
    });

    res.status(201).json(record);
  } catch (err) {
    console.error("Attendance POST error:", err);
    res.status(500).json({ message: "Error marking attendance", error: err.message });
  }
});

// Get attendance records
router.get("/", authMiddleware, async (req, res) => {
  try {
    const records = await Attendance.findAll({
      include: [{ model: Student, as: "Student" }],
      order: [["date", "DESC"]],
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance" });
  }
});

module.exports = router;
