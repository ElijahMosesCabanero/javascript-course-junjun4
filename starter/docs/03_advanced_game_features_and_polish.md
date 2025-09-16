'use strict';

const MIN_NUMBER = 1;
const MAX_NUMBER = 20;
const START_SCORE = 20;

const bodyEl = document.body;
const messageEl = document.querySelector('.message');
const numberEl = document.querySelector('.number');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const guessInputEl = document.querySelector('.guess');
const checkBtnEl = document.querySelector('.check');
const againBtnEl = document.querySelector('.again');

// UI Helpers
function setMessage(text) {
  messageEl.textContent = text;
}
function setNumber(value) {
  numberEl.textContent = value;
}
function setScore(value) {
  scoreEl.textContent = value;
}
function setHighscore(value) {
  highscoreEl.textContent = value;
}
function setBackground(color) {
  bodyEl.style.backgroundColor = color;
}
function disablePlay(disabled) {
  guessInputEl.disabled = disabled;
  checkBtnEl.disabled = disabled;
}
function disableAgain(disabled) {
  againBtnEl.disabled = disabled;
}
function clearInput() {
  guessInputEl.value = '';
}

// Game State & Reset
let secretNumber = Math.trunc(Math.random() * MAX_NUMBER) + MIN_NUMBER;
let score = START_SCORE;
let highscore = 0;

function resetGameState() {
  score = START_SCORE;
  secretNumber = Math.trunc(Math.random() * MAX_NUMBER) + MIN_NUMBER;
}

function renderInitialUI() {
  setMessage('Take a wild guess...');
  setNumber('?');
  setScore(score);
  clearInput();
  disablePlay(false);
  disableAgain(false);
  setBackground('');
}

renderInitialUI();

// Handlers
checkBtnEl.addEventListener('click', function () {
  const guess = Number(guessInputEl.value);

  // Validation
  if (!guess) return setMessage('Uh-oh, you didn’t type anything! Try again...');
  if (guess < MIN_NUMBER || guess > MAX_NUMBER)
    return setMessage(`Oops! Guess a number between ${MIN_NUMBER} and ${MAX_NUMBER}!`);

  if (guess === secretNumber) {
    setMessage('🎉 Bingo! You got it right, genius! 🎉');
    setNumber(secretNumber);
    setBackground('green');
    if (score > highscore) {
      highscore = score;
      setHighscore(highscore);
    }
    disablePlay(true);
    clearInput();
    return;
  }

  // Wrong guess
  setMessage(guess > secretNumber ? 'Too hot! 🔥 Try something smaller!' : 'Too cold! 🥶 Go higher!');
  score--;
  setScore(score);

  if (score < 1) {
    setMessage('💀 Game over! You lost, but don’t give up! Try again!');
    setNumber(secretNumber);
    setBackground('red');
    disablePlay(true);
    disableAgain(true); // Disable "again" until user presses it
    clearInput();
  }
});

againBtnEl.addEventListener('click', function () {
  resetGameState();
  renderInitialUI();
  disableAgain(false); // Enable "again" button after restarting
});
