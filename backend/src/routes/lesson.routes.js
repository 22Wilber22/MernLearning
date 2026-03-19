const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');

const router = express.Router();

router.get('/:id', authenticate, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('exercises');
    if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
    res.json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/:id/complete', authenticate, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
    await Progress.findOneAndUpdate(
      { userId: req.user._id, lessonId: lesson._id, type: 'lesson_complete' },
      { userId: req.user._id, moduleId: lesson.moduleId, lessonId: lesson._id, type: 'lesson_complete', xpEarned: lesson.xpReward },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: 'Lesson marked as complete', xpEarned: lesson.xpReward });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
