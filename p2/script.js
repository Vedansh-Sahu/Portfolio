const choiceButtons = document.querySelectorAll('.choice-button');
const statusDisplay = document.querySelector('.game-status');
const resetButton = document.querySelector('.reset-button');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');

let playerScore = 0;
let computerScore = 0;
const winningScore = 3;

const choices = ['stone', 'paper', 'scissors'];

const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
};

const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    if (
        (playerChoice === 'stone' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'stone') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    } else {
        return 'computer';
    }
};

const updateScore = (winner) => {
    if (winner === 'player') {
        playerScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
};

const checkGameWinner = () => {
    if (playerScore === winningScore) {
        statusDisplay.innerHTML = 'You are the winner of the game! 🎉';
        disableChoices();
    } else if (computerScore === winningScore) {
        statusDisplay.innerHTML = 'The computer wins the game. 🤖';
        disableChoices();
    }
};

const disableChoices = () => {
    choiceButtons.forEach(button => {
        button.disabled = true;
    });
};

const handlePlayerChoice = (event) => {
    const playerChoice = event.currentTarget.getAttribute('data-choice');
    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);

    if (winner === 'draw') {
        statusDisplay.innerHTML = `It's a draw! You both chose ${playerChoice}.`;
    } else if (winner === 'player') {
        statusDisplay.innerHTML = `You win! ${playerChoice} beats ${computerChoice}.`;
    } else {
        statusDisplay.innerHTML = `You lose! ${computerChoice} beats ${playerChoice}.`;
    }
    
    updateScore(winner);
    checkGameWinner();
};

const resetGame = () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    statusDisplay.innerHTML = 'Choose your weapon!';
    choiceButtons.forEach(button => {
        button.disabled = false;
    });
};

choiceButtons.forEach(button => {
    button.addEventListener('click', handlePlayerChoice);
});

resetButton.addEventListener('click', resetGame);