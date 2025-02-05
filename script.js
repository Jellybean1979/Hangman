// script.js
const wordInput = document.getElementById('word-input');
const startGameButton = document.getElementById('start-game');
const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const hangmanElement = document.getElementById('hangman');
const messageElement = document.getElementById('message');
const letterInput = document.getElementById('letter-input');
const hangmanContext = hangmanElement.getContext('2d');

let selectedWord = '';
let correctLetters = [];
let wrongLetters = [];

// Hangman drawing steps
const hangmanParts = [
    () => { hangmanContext.beginPath(); hangmanContext.arc(100, 50, 20, 0, Math.PI * 2); hangmanContext.stroke(); },
    () => { hangmanContext.moveTo(100, 70); hangmanContext.lineTo(100, 130); hangmanContext.stroke(); },
    () => { hangmanContext.moveTo(100, 80); hangmanContext.lineTo(80, 110); hangmanContext.stroke(); },
    () => { hangmanContext.moveTo(100, 80); hangmanContext.lineTo(120, 110); hangmanContext.stroke(); },
    () => { hangmanContext.moveTo(100, 130); hangmanContext.lineTo(80, 160); hangmanContext.stroke(); },
    () => { hangmanContext.moveTo(100, 130); hangmanContext.lineTo(120, 160); hangmanContext.stroke(); },
];

function displayWord() {
    wordElement.innerHTML = selectedWord
        .split('')
        .map(letter => (letter === ' ' ? '&nbsp;' : (correctLetters.includes(letter) ? letter : '_')))
        .join(' ');
}

function updateWrongLetters() {
    wrongLettersElement.innerHTML = `Wrong letters: ${wrongLetters.join(', ')}`;
    hangmanParts[wrongLetters.length - 1]();

    if (wrongLetters.length === hangmanParts.length) {
        messageElement.textContent = 'Game Over!';
        letterInput.disabled = true;
    }
}

function checkLetter(letter) {
    if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
        }
    } else {
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
        }
    }
    displayWord();
    updateWrongLetters();
    checkWin();
}

function checkWin() {
    if (selectedWord.split('').every(letter => letter === ' ' || correctLetters.includes(letter))) {
        messageElement.textContent = 'You Win!';
        letterInput.disabled = true;
    }
}

startGameButton.addEventListener('click', () => {
    selectedWord = wordInput.value.toLowerCase();
    correctLetters = [];
    wrongLetters = [];
    wordInput.value = '';
    letterInput.disabled = false;
    hangmanContext.clearRect(0, 0, hangmanElement.width, hangmanElement.height);
    displayWord();
    wrongLettersElement.innerHTML = '';
    messageElement.textContent = '';
    letterInput.focus();
});

letterInput.addEventListener('input', () => {
    const letter = letterInput.value.toLowerCase();
    if (letter && /^[a-z]$/.test(letter)) {
        checkLetter(letter);
    }
    letterInput.value = '';
});
