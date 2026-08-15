const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { analyzeResume, getHistory, getAnalysisById } = require('../controllers/analysisController');

router.post('/analyze', protect, analyzeResume);
router.get('/history', protect, getHistory);
router.get('/:id', protect, getAnalysisById);

module.exports = router;