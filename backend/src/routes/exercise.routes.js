const express = require('express');
const { getExercise, submitExercise } = require('../controllers/exercise.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/:id', authenticate, getExercise);
router.post('/:id/submit', authenticate, submitExercise);

module.exports = router;
