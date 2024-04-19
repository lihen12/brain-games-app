// components/Leaderboard.js
import React, { useEffect, useState } from 'react';

const Leaderboard = ({ gameId }) => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetch(`/api/scores/${gameId}`)
            .then(res => res.json())
            .then(data => setScores(data))
            .catch(err => console.log(err));
    }, [gameId]);

    return (
        <div>
            <h2>Leaderboard for {gameId}</h2>
            <ul>
                {scores.map((score, index) => (
                    <li key={index}>{score.userId}: {score.score}</li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
