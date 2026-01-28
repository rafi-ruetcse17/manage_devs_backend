const mongoose = require("mongoose");

const dailyNoteSchema = new mongoose.Schema(
  {
    developerName: {
      type: String,
      required: [true, "Please add developer name"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please add username"],
      trim: true,
    },
    dayStartPlan: {
      type: String,
      required: [true, "Please add your plan for the day"],
      trim: true,
    },
    dayEndWorkUpdate: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    hasBlocker: {
      type: Boolean,
      required: [true, "Please specify if there is any blocker"],
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("DailyNote", dailyNoteSchema);
