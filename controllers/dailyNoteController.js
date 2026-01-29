const DailyNote = require("../models/DailyNote");

// @desc    Create a new daily note
// @route   POST /api/daily-notes
// @access  Private
const createDailyNote = async (req, res) => {
  try {
    const { dayStartPlan, dayEndWorkUpdate, hasBlocker, date } = req.body;
    const developerName = req.user.name;
    const username = req.user.username;

    if (!dayStartPlan || hasBlocker === undefined) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: dayStartPlan and hasBlocker",
      });
    }

    const baseDate = date ? new Date(date) : new Date();

    const startOfDay = new Date(baseDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(baseDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingNote = await DailyNote.findOne({
      username,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existingNote) {
      existingNote.dayStartPlan = dayStartPlan;
      existingNote.dayEndWorkUpdate =
        dayEndWorkUpdate || existingNote.dayEndWorkUpdate;
      existingNote.hasBlocker = hasBlocker;
      await existingNote.save();

      return res.status(200).json({
        success: true,
        data: existingNote,
        message: "Check-in updated successfully",
      });
    }

    const dailyNote = await DailyNote.create({
      developerName,
      username,
      dayStartPlan,
      dayEndWorkUpdate: dayEndWorkUpdate || "",
      hasBlocker,
      createdAt: date ? startOfDay : undefined,
    });

    res.status(201).json({
      success: true,
      data: dailyNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all daily notes
// @route   GET /api/daily-notes?date=YYYY-MM-DD
// @access  Public
const getAllDailyNotes = async (req, res) => {
  try {
    const { date } = req.query;
    let query = {};

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      query.createdAt = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    const dailyNotes = await DailyNote.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: dailyNotes.length,
      data: dailyNotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDailyNote,
  getAllDailyNotes,
};
