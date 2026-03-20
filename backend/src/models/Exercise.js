const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructions: { type: String, required: true },
  starterCode: { type: String, default: '' },
  solutionCode: { type: String, default: '' },
  language: { type: String, enum: ['html', 'css', 'javascript', 'typescript', 'nodejs'], default: 'html' },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  xpReward: { type: Number, default: 100 },
  hints: [String],
  order: { type: Number, required: true },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);
