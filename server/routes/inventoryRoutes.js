const express = require("express");
const router = express.Router();
const InventoryItem = require("../models/InventoryItem");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

// Add new item
router.post("/", async (req, res) => {
  const item = await InventoryItem.create(req.body);
  res.json(item);
});

// Get all items
router.get("/", async (req, res) => {
  const items = await InventoryItem.findAll();
  res.json(items);
});

// Update item
router.put("/:id", async (req, res) => {
  const item = await InventoryItem.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  await item.update(req.body);
  res.json(item);
});

// Delete item
router.delete("/:id", async (req, res) => {
  const item = await InventoryItem.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  await item.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;
