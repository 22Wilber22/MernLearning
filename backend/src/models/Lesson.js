const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, required: true },
  type: { type: String, enum: ['theory', 'practice', 'quiz'], default: 'theory' },
  xpReward: { type: Number, default: 50 },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
  estimatedMinutes: { type: Number, default: 20 },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
