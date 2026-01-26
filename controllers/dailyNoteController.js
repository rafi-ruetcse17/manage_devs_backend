const DailyNote = require('../models/DailyNote');

// @desc    Create a new daily note
// @route   POST /api/daily-notes
// @access  Public
const createDailyNote = async (req, res) => {
  try {
    const { developerName, previousDayWork, todayPlan, hasBlocker } = req.body;

    // Validation
    if (!developerName || !previousDayWork || !todayPlan || hasBlocker === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: developerName, previousDayWork, todayPlan, and hasBlocker',
      });
    }

    // Create daily note
    const dailyNote = await DailyNote.create({
      developerName,
      previousDayWork,
      todayPlan,
      hasBlocker,
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

    // If date is provided, filter by that specific date
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      query.createdAt = {
        $gte: startOfDay,
        $lte: endOfDay
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
