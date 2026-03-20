const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, minlength: 6 },
  googleId: { type: String, sparse: true },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  isVerified: { type: Boolean, default: false },
  progress: [{
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    completedExercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    score: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 }
  }],
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  lastActivity: { type: Date, default: Date.now }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
