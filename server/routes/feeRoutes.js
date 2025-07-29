// // server/routes/feeRoutes.js
// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middlewares/authMiddleware");

// const sequelize = require("../config/db"); // your Sequelize instance
// const FeeModel = require("../models/Fee");
// const StudentModel = require("../models/Student");

// const Fee = FeeModel(sequelize, require("sequelize").DataTypes);
// const Student = StudentModel(sequelize, require("sequelize").DataTypes);

// // Manual association:
// Fee.belongsTo(Student, { foreignKey: "studentId" });

// // GET all fee records
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const fees = await Fee.findAll({
//       include: [{ model: Student }],
//     });
//     res.json(fees);
//   } catch (err) {
//     console.error("Fee load error:", err);
//     res.status(500).json({ message: "Server error loading fees" });
//   }
// });

// // POST new fee
// router.post("/", verifyToken, async (req, res) => {
//   try {
//     const { studentId, amountPaid, paymentDate, method } = req.body;
//     const newFee = await Fee.create({ studentId, amountPaid, paymentDate, method });
//     res.status(201).json(newFee);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to create fee record", error: err.message });
//   }
// });

// module.exports = router;
// server/routes/feeRoutes.js
// const express = require("express");
// const router = express.Router();
// const verifyToken = require("../middlewares/authMiddleware");


// // GET all fee records
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const fees = await Fee.findAll({ include: [Student] });
//     res.json(fees);
//   } catch (err) {
//     res.status(500).json({ message: "Server error loading fees", error: err.message });
//   }
// });

// // POST a new fee record
// router.post("/", verifyToken, async (req, res) => {
//   try {
//     const { studentId, amountPaid, paymentDate, method } = req.body;
//     const newFee = await Fee.create({ studentId, amountPaid, paymentDate, method });
//     res.status(201).json(newFee);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to create fee record", error: err.message });
//   }
// });

// module.exports = router;
// routes/feeRoutes.js
// routes/feeRoutes.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const Fee = require("../models/Fee");
const Student = require("../models/Student");

router.get("/", verifyToken, async (req, res) => {
  try {
    const fees = await Fee.findAll({
      include: [{ model: Student, as: "Student" }],
      order: [["paymentDate", "DESC"]],
    });
    res.json(fees);
  } catch (err) {
    console.error("Error fetching fees:", err);
    res.status(500).json({ message: "Server error loading fees" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { studentId, amountPaid, paymentDate, method } = req.body;
    const newFee = await Fee.create({ studentId, amountPaid, paymentDate, method });
    res.status(201).json(newFee);
  } catch (err) {
    console.error("Error creating fee:", err);
    res.status(400).json({ message: "Error creating fee" });
  }
});

module.exports = router;
