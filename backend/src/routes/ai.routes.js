const express = require('express');
const { reviewCode, getHint, explainConcept } = require('../controllers/ai.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/review', authenticate, reviewCode);
router.post('/hint', authenticate, getHint);
router.post('/explain', authenticate, explainConcept);

module.exports = router;
