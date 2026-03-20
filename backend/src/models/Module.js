const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, default: '📚' },
  color: { type: String, default: '#3B82F6' },
  order: { type: Number, required: true },
  isLocked: { type: Boolean, default: true },
  unlockPercentage: { type: Number, default: 70 },
  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  totalXP: { type: Number, default: 0 },
  estimatedHours: { type: Number, default: 5 },
  tags: [String],
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Module', moduleSchema);
