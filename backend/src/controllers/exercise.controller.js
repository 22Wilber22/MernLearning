const Exercise = require('../models/Exercise');
const Progress = require('../models/Progress');
const User = require('../models/User');
const { reviewCode } = require('../services/gemini.service');

exports.getExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ success: false, message: 'Exercise not found' });
    res.json({ success: true, data: exercise });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.submitExercise = async (req, res) => {
  try {
    const { code } = req.body;
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ success: false, message: 'Exercise not found' });

    const aiReview = await reviewCode(code, exercise.description, exercise.language);

    const progress = await Progress.create({
      userId: req.user._id,
      moduleId: exercise.moduleId,
      exerciseId: exercise._id,
      type: 'exercise_complete',
      code,
      aiReview: aiReview.feedback,
      score: aiReview.score,
      xpEarned: exercise.xpReward
    });

    const user = await User.findById(req.user._id);
    const hasProgress = user && user.progress.some(
      p => p.moduleId.toString() === exercise.moduleId.toString()
    );

    if (hasProgress) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { xp: exercise.xpReward },
        $addToSet: { 'progress.$[elem].completedExercises': exercise._id }
      }, { arrayFilters: [{ 'elem.moduleId': exercise.moduleId }] });
    } else {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { xp: exercise.xpReward },
        $push: { progress: { moduleId: exercise.moduleId, completedExercises: [exercise._id] } }
      });
    }

    res.json({ success: true, data: { progress, aiReview } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
