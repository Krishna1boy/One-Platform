const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const verifyToken = require("../middlewares/authMiddleware");

router.use(verifyToken);

// GET all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.findAll({ order: [["createdAt", "DESC"]] });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: "Failed to load clients" });
  }
});

// POST a new client
router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const client = await Client.create({ name, email, phone });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: "Failed to add client" });
  }
});

module.exports = router;
