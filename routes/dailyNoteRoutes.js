const express = require("express");
const router = express.Router();
const {
  createDailyNote,
  getAllDailyNotes,
} = require("../controllers/dailyNoteController");
const { protect } = require("../middleware/authMiddleware");

// GET /api/daily-notes - Get all daily notes
router.get("/", getAllDailyNotes);

// POST /api/daily-notes - Create a new daily note
router.post("/", protect, createDailyNote);

module.exports = router;
