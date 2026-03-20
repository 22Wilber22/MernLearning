const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const User = require('../models/User');

const router = express.Router();

router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('progress.moduleId', 'title slug icon');
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name, avatar } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: name.trim(), avatar },
      { new: true }
    );
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
