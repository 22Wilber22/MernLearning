const Module = require('../models/Module');
const Lesson = require('../models/Lesson');

exports.getAllModules = async (req, res) => {
  try {
    const modules = await Module.find({ isPublished: true }).sort('order').populate('lessons', 'title type order xpReward');
    res.json({ success: true, data: modules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getModuleById = async (req, res) => {
  try {
    const module = await Module.findOne({ slug: req.params.slug, isPublished: true }).populate({
      path: 'lessons',
      populate: { path: 'exercises', select: 'title difficulty xpReward order' }
    });
    if (!module) return res.status(404).json({ success: false, message: 'Module not found' });
    res.json({ success: true, data: module });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
