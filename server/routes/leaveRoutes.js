const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

// Apply for leave
router.post("/", async (req, res) => {
  try {
    const { type, fromDate, toDate, reason } = req.body;
    const userId = req.user.id;

    const leave = await Leave.create({ type, fromDate, toDate, reason, userId });
    res.json(leave);
  } catch (err) {
    console.error("Error applying for leave:", err);
    res.status(500).json({ message: "Leave application failed" });
  }
});

// Get employee's leave history
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const leaves = await Leave.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(leaves);
  } catch (err) {
    console.error("Failed to load leave history:", err);
    res.status(500).json({ message: "Failed to load leave history" });
  }
});

// GET /api/leaves/all — For Admin/HR to see all leave requests
router.get("/all", async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "Admin" && role !== "HR") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const leaves = await Leave.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["name", "email", "role"],
        },
      ],
    });
    res.json(leaves);
  } catch (err) {
    console.error("Failed to load all leave requests:", err);
    res.status(500).json({ message: "Error fetching leave requests" });
  }
});


// Update leave status by Admin/HR
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body; // "Approved" or "Rejected"
    const { role } = req.user;

    if (role !== "Admin" && role !== "HR") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const leave = await Leave.findByPk(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = status;
    await leave.save();

    res.json({ message: "Leave status updated", leave });
  } catch (err) {
    console.error("Error updating leave status:", err);
    res.status(500).json({ message: "Failed to update leave status" });
  }
});

module.exports = router;
