const express = require("express");
const router = express.Router();
const Payroll = require("../models/Payroll");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

// Get salary records for logged-in employee
router.get("/employee", async (req, res) => {
  try {
    const payrolls = await Payroll.findAll({
      where: { userId: req.user.id },
      include: [{ model: User, attributes: ["name", "email"] }],
    });
    res.json(payrolls);
  } catch (err) {
    console.error("Payroll fetch error", err);
    res.status(500).json({ message: "Error fetching payrolls" });
  }
});

// Admin/HR: Add salary for employee
router.post("/", async (req, res) => {
  try {
    const { userId, amount, datePaid, remarks } = req.body;
    const payroll = await Payroll.create({ userId, amount, datePaid, remarks });
    res.json(payroll);
  } catch (err) {
    console.error("Payroll add error", err);
    res.status(500).json({ message: "Error creating payroll" });
  }
});
// Get all payroll records (admin view)
router.get("/", async (req, res) => {
  try {
    const records = await Payroll.findAll({
      include: [{ model: User, attributes: ["name", "email"] }],
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all payrolls" });
  }
});


module.exports = router;
