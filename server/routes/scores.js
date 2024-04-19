// routes/scores.js
const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

router.post('/', async (req, res) => {
    const { userId, gameId, score } = req.body;
    // Find existing scores for the game and sort them in descending order, limiting to the top 10
    const existingScores = await Score.find({ gameId }).sort({ score: -1 }).limit(10);

    // Check if the new score qualifies to be in the top 10
    if (existingScores.length < 10 || score > existingScores[existingScores.length - 1].score) {
        // If less than 10 scores or new score is higher than the lowest in top 10
        const newScore = new Score({ userId, gameId, score });
        await newScore.save();  // Saving the new score into MongoDB

        // Remove the lowest score if there are already 10 scores
        if (existingScores.length >= 10) {
            await Score.findByIdAndDelete(existingScores[existingScores.length - 1]._id);
        }
        res.status(201).send('Score added to leaderboard');
    } else {
        res.status(200).send('Score not high enough for leaderboard');
    }
});

router.get('/:gameId', async (req, res) => {
    try {
        console.log("Querying scores for:", req.params.gameId);
        const scores = await Score.find({ gameId: req.params.gameId }).sort({ score: -1 }).limit(10);
        console.log("Scores found:", scores);
        res.json(scores);
    } catch (error) {
        console.error("Error retrieving scores:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
