const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  originalFileName: {
    type: String,
    required: true,
  },
  extractedText: {
    type: String,
    required: true,
  },
  targetRole: {
    type: String,
  },
  currentSkills: {
    type: [String],
    default: [],
  },
  missingSkills: {
    type: [String],
    default: [],
  },
  recommendations: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);