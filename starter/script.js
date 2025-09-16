'use strict';

// DOM Element Selection
console.log('=== DOM ELEMENT SELECTION ===');

const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const numberEl = document.querySelector('.number');
const highScoreEl = document.querySelector('.highscore');
const guessInput = document.querySelector('.guess');

// GAME STATE VARIABLES
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log('Your secret number is:', secretNumber);
let score = 20;
let highscore = 0;

document.querySelector('.score').textContent = score;
document.querySelector('.highscore').textContent = highscore;

// BASIC GAME LOGIC
document.querySelector('.check').addEventListener('click', function () {
  console.log('Check button clicked!');
  const guess = Number(document.querySelector('.guess').value);
  console.log('Player guessed:', guess);

  // Input Validation
  if (!guess) {
    messageEl.textContent = 'Please input a valid number!';
    return;
  }

  if (guess < 1 || guess > 20) {
    messageEl.textContent = 'The number should be between 1 and 20!';
    return;
  }

  if (guess === secretNumber) {
    console.log('You guessed it!');
    numberEl.textContent = secretNumber;
    messageEl.textContent = '🎉 You guessed it right! 🎉';

    if (score > highscore) {
      highscore = score;
      highScoreEl.textContent = highscore;
    }

    // Disable inputs when the game is won
    document.querySelector('.guess').disabled = true;
    document.querySelector('.check').disabled = true;
    document.body.style.backgroundColor = 'green';
  } else if (guess > secretNumber) {
    console.log('Too high!');
    messageEl.textContent = 'Too high! Try again...';
    score--;
    scoreEl.textContent = score;
    if (score < 1) {
      messageEl.textContent = 'Game over! Try again!';
      numberEl.textContent = secretNumber;
      document.querySelector('.guess').disabled = true;
      document.querySelector('.check').disabled = true;
      document.body.style.backgroundColor = 'red';
    }
  } else if (guess < secretNumber) {
    console.log('Too low!');
    messageEl.textContent = 'Too low! Try again...';
    score--;
    scoreEl.textContent = score;
    if (score < 1) {
      messageEl.textContent = 'Game over! Try again!';
      numberEl.textContent = secretNumber;
      document.querySelector('.guess').disabled = true;
      document.querySelector('.check').disabled = true;
      document.body.style.backgroundColor = 'red';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  // Reset the game
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  messageEl.textContent = 'Start guessing...';
  numberEl.textContent = '?';
  scoreEl.textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('.guess').disabled = false;
  document.querySelector('.check').disabled = false;
  document.body.style.backgroundColor = ''; // Reset the background color
});
