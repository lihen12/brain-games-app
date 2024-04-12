// src/components/MemoryGame.js
import React, { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook

const MemoryGame = () => {
    const { currentUser } = useAuth(); // Access user information

    const handleScore = (score) => {
        if (currentUser) {
            console.log("Score:", score, "posted by:", currentUser.email);
            // Here, send the score to your backend to be saved to the leaderboard
        } else {
            console.log("Score not saved, user not logged in");
            // Optionally handle the score differently if not logged in
        }
    };

    return (
        <div>
            <h1>Memory Game</h1>
            <iframe src="/memory-game/index.html" title="Memory Game" style={{ width: '100%', height: '600px', border: 'none' }} />
        </div>
    );
};

export default MemoryGame;
