const express = require('express');
const router = express.Router();
const { generateContent, generateCouncilDiscussion } = require('../controllers/aiController');

router.post('/generate', generateContent);
router.post('/council', generateCouncilDiscussion);

module.exports = router;