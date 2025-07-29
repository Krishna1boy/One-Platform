const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Document = require("../models/Document");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User"); // ✅ Add this

router.use(authMiddleware);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/documents/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload document
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const document = await Document.create({
      title,
      description,
      fileUrl: `/uploads/documents/${req.file.filename}`,
      userId,
    });

    res.json(document);
  } catch (err) {
    console.error("Error uploading document:", err);
    res.status(500).json({ message: "Document upload failed" });
  }
});

// Get all documents for logged-in employee
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const documents = await Document.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(documents);
  } catch (err) {
    console.error("Error loading documents:", err);
    res.status(500).json({ message: "Error fetching documents" });
  }
});
// GET /api/documents/all — For Admin
router.get("/all", async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "Admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const documents = await Document.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["name", "email", "role"],
        },
      ],
    });

    res.json(documents);
  } catch (err) {
    console.error("Failed to load documents:", err);
    res.status(500).json({ message: "Error fetching documents" });
  }
});

// PUT /api/documents/:id/status
router.put("/:id/status", async (req, res) => {
  try {
    const { role } = req.user;
    const { status } = req.body;

    if (role !== "Admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const document = await Document.findByPk(req.params.id);
    if (!document) return res.status(404).json({ message: "Document not found" });

    document.status = status;
    await document.save();

    res.json({ message: "Document status updated", document });
  } catch (err) {
    console.error("Error updating document status:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;
