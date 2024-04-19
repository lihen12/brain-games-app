// // MemoryGame.js
// import React, { useContext } from 'react';
// import { useAuth } from '../contexts/AuthContext';

// const MemoryGame = () => {
//     const { currentUser } = useAuth();

//     const postScore = async (score) => {
//         if (!currentUser) {
//             console.log("Score not saved, user not logged in");
//             return;
//         }

//         try {
//             const response = await fetch('/api/scores', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ userId: currentUser.uid, gameId: 'memory-game', score })
//             });
//             const data = await response.json();
//             console.log('Score posted:', data);
//         } catch (error) {
//             console.error('Error posting score:', error);
//         }
//     };

//     // Call postScore somewhere in your game logic, e.g., endGame()
//     return (
//         <div>
//             <h1>Memory Game</h1>
//             <iframe src="/memory-game/index.html" title="Memory Game" style={{ width: '100%', height: '600px', border: 'none' }} />
//         </div>
//     );
// };

// export default MemoryGame;

import React, { useEffect, useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';

const MemoryGame = () => {
    const { currentUser } = useAuth();

    useEffect(() => {
        const handleScorePost = (event) => {
            const { score } = event.detail;
            if (currentUser) {
                postScore(score);
            }
        };

        document.addEventListener('gameCompleted', handleScorePost);
        return () => document.removeEventListener('gameCompleted', handleScorePost);
    }, [currentUser]);

    const postScore = async (score) => {
        if (!currentUser) return;
        await fetch('/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: currentUser.uid, gameId: 'memory-game', score })
        });
    };

    return (
        <div>
            <h1>Memory Game</h1>
            <iframe src="/memory-game/index.html" title="Memory Game" style={{ width: '100%', height: '600px', border: 'none' }} />
        </div>
    );
};

export default MemoryGame;
