const mongoose = require('mongoose');

const dailyNoteSchema = new mongoose.Schema(
  {
    developerName: {
      type: String,
      required: [true, 'Please add developer name'],
      trim: true,
    },
    previousDayWork: {
      type: String,
      required: [true, 'Please add what you did on the previous day'],
      trim: true,
    },
    todayPlan: {
      type: String,
      required: [true, 'Please add what you will do today'],
      trim: true,
    },
    hasBlocker: {
      type: Boolean,
      required: [true, 'Please specify if there is any blocker'],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('DailyNote', dailyNoteSchema);
