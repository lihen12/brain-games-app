// components/LeaderboardPage.js
import React, { useState } from 'react';
import Leaderboard from './Leaderboard';

const LeaderboardPage = () => {
    const [selectedGame, setSelectedGame] = useState('memory-game'); // default to memory game

    return (
        <div>
            <select onChange={e => setSelectedGame(e.target.value)}>
                <option value="memory-game">Memory Game</option>
                {/* Future games will be added here */}
            </select>
            <Leaderboard gameId={selectedGame} />
        </div>
    );
};

export default LeaderboardPage;
