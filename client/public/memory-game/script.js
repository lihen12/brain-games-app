const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    score: document.querySelector('.score'), // added score
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const original = clonedArray[i]

        clonedArray[i] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension');

    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.");
    }

    const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍'];
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
    const items = shuffle([...picks, ...picks]);
    const cardsHTML = items.map(item => `
        <div class="card">
            <div class="card-front"></div>
            <div class="card-back">${item}</div>
        </div>
    `).join('');

    // Instead of replacing the board, update its inner HTML
    selectors.board.innerHTML = cardsHTML;
    // No need to replace 'selectors.board' as it's now always pointing to the correct element
}

const startGame = () => {
    state.totalFlips = 0;
    state.totalTime = 0;
    selectors.moves.innerText = '0 moves';
    selectors.timer.innerText = 'Time: 0 sec';
    updateScore();  // Initialize score display
    selectors.start.classList.add('disabled');

    state.loop = setInterval(() => {
        state.totalTime++;
        selectors.timer.innerText = `Time: ${state.totalTime} sec`;
        updateScore();  // Continuously update score as time increases
    }, 1000);

    state.gameStarted = true;
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

// Function to update the score display
function updateScore() {
    const score = (2 * state.totalFlips) + state.totalTime;
    selectors.score.innerText = `Score: ${score}`;  // Update the score display
}

const flipCard = card => {
    if (!state.gameStarted) {
        startGame();  // This will start the timer
    }

    if (state.flippedCards < 2) {
        card.classList.add('flipped');
        state.flippedCards++;

        if (state.flippedCards === 2) {
            state.totalFlips++;  // Increment totalFlips after two cards are flipped
            selectors.moves.innerText = `${state.totalFlips} moves`;
            updateScore();  // Update score after each move

            const flippedCards = document.querySelectorAll('.flipped:not(.matched)');
            if (flippedCards.length === 2 && flippedCards[0].querySelector('.card-back').innerText === flippedCards[1].querySelector('.card-back').innerText) {
                flippedCards.forEach(card => card.classList.add('matched'));
            }

            setTimeout(() => {
                flipBackCards();  // Reset flipped cards
                updateScore();  // Ensure score is updated if cards are unmatched
            }, 1000);
        }
    }

    checkGameOver();  // Check if the game is over and display results if it is
}

// Function to check if the game is over
const checkGameOver = () => {
    if (document.querySelectorAll('.card:not(.matched)').length === 0) {  // All cards are matched
        setTimeout(() => {
            endGame();  // Calculate and display score
        }, 1000);
    }
}

// const endGame = () => {
//     clearInterval(state.loop);
//     state.gameStarted = false;

//     updateScore();  // Final score update

//     selectors.win.innerHTML = `
//         <div class="win-text">
//             You won!<br />
//             Score: ${selectors.score.innerText}<br />
//             Moves: ${state.totalFlips}<br />
//             Time: ${state.totalTime} seconds<br />
//             <button id="reset-btn">Reset</button>
//         </div>
//     `;
//     document.getElementById('reset-btn').addEventListener('click', resetGame);
//     selectors.boardContainer.classList.add('flipped');  // Show the win message
// }

const endGame = () => {
    clearInterval(state.loop);
    state.gameStarted = false;
    updateScore();  // Ensure final score update

    // Dispatch custom event with the final score
    const finalScore = (2 * state.totalFlips) + state.totalTime;  // Assuming this is how you calculate the final score
    document.dispatchEvent(new CustomEvent('gameCompleted', { detail: { score: finalScore } }));

    selectors.win.innerHTML = `
        <div class="win-text">
            You won!<br />
            Score: ${selectors.score.innerText}<br />
            Moves: ${state.totalFlips}<br />
            Time: ${state.totalTime} seconds<br />
            <button id="reset-btn">Reset</button>
        </div>
    `;
    document.getElementById('reset-btn').addEventListener('click', resetGame);
    selectors.boardContainer.classList.add('flipped');  // Show the win message
};


const resetGame = () => {
    selectors.boardContainer.classList.remove('flipped');
    selectors.win.innerHTML = '';
    selectors.start.classList.remove('disabled');

    clearInterval(state.loop);  // Ensure no timer is running
    state.gameStarted = false;
    state.totalFlips = 0;
    state.totalTime = 0;

    generateGame();  // Regenerate the game board
    attachEventListeners();  // Reattach event listeners
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}

generateGame()
attachEventListeners()