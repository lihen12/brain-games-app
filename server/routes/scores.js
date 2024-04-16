// routes/scores.js
const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// Post a new score
router.post('/', async (req, res) => {
  try {
    const { userId, gameId, score } = req.body;
    const newScore = new Score({ userId, gameId, score });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get top scores for a game
router.get('/:gameId', async (req, res) => {
  try {
    const scores = await Score.find({ gameId: req.params.gameId })
                             .sort({ score: -1 })
                             .limit(10);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
