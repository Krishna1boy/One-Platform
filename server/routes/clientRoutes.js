const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

// Create client
router.post("/", async (req, res) => {
  const client = await Client.create(req.body);
  res.json(client);
});

// Get clients
router.get("/", async (req, res) => {
  const clients = await Client.findAll();
  res.json(clients);
});

// Update client
router.put("/:id", async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (!client) return res.status(404).json({ message: "Client not found" });
  await client.update(req.body);
  res.json(client);
});

// Delete client
router.delete("/:id", async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (!client) return res.status(404).json({ message: "Client not found" });
  await client.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;
