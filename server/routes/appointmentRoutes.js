// server/routes/appointmentRoutes.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const verifyToken = require("../middlewares/authMiddleware");

// ✅ Create an appointment (Admin only)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { patientName, doctorId, date, time, reason } = req.body;

    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only admin can create appointments" });
    }

    const appointment = await Appointment.create({
      patientName,
      doctorId,
      date,
      time,
      reason,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Failed to create appointment", error: err.message });
  }
});

// ✅ Get all appointments for the logged-in doctor
// server/routes/appointmentRoutes.js
router.get("/doctor", verifyToken, async (req, res) => {
  try {
    const doctorId = req.user.id;
    const appointments = await Appointment.findAll({
      where: { doctorId },
      order: [["date", "ASC"]],
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch appointments", error: err.message });
  }
});

// ✅ Admin can view all appointments with doctor info
// Get ALL appointments (Admin)
router.get("/all", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const appointments = await Appointment.findAll({
      include: [{ model: User, as: "Doctor", attributes: ["name", "email"] }],
      order: [["date", "ASC"]],
    });

    res.json(appointments);
  } catch (err) {
    console.error("Admin Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch all appointments" });
  }
});

// ✅ Update appointment status (Doctor or Admin)
router.put("/:id/status", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only the assigned doctor or admin can update
    if (
      req.user.role === "Doctor" &&
      appointment.doctorId !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized to update this appointment" });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
});

module.exports = router;
