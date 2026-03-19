const express = require('express');
const { getAllModules, getModuleById } = require('../controllers/module.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authenticate, getAllModules);
router.get('/:slug', authenticate, getModuleById);

module.exports = router;
