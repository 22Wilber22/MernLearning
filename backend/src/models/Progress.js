const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
  type: { type: String, enum: ['lesson_complete', 'exercise_complete', 'module_complete'], required: true },
  code: { type: String },
  aiReview: { type: String },
  score: { type: Number, default: 0 },
  xpEarned: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
