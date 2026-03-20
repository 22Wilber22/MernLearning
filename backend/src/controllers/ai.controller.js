const { reviewCode, getHint, explainConcept } = require('../services/gemini.service');

exports.reviewCode = async (req, res) => {
  try {
    const { code, description, language } = req.body;
    if (!code || !description) {
      return res.status(400).json({ success: false, message: 'Code and description are required' });
    }
    const review = await reviewCode(code, description, language || 'html');
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getHint = async (req, res) => {
  try {
    const { exerciseDescription, currentCode, language } = req.body;
    const hint = await getHint(exerciseDescription, currentCode, language || 'html');
    res.json({ success: true, data: { hint } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.explainConcept = async (req, res) => {
  try {
    const { concept, language } = req.body;
    const explanation = await explainConcept(concept, language || 'html');
    res.json({ success: true, data: { explanation } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
