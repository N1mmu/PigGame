'use strict';

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const currentScore0EL = document.getElementById('current--0');
const currentScore1EL = document.getElementById('current--1');
const newGame = document.querySelector('.btn--new');
const scores = [0, 0];

dice.classList.add('hidden');
var currentPlayer = 0;
score0EL.textContent = 0;
score1EL.textContent = 0;
var currentScore = 0;
var playing = true;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer == 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

rollBtn.addEventListener('click', function () {
  if (!playing) return;
  let roll = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  dice.src = `dice-${roll}.png`;
  if (roll - 1) {
    currentScore += roll;
    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

holdBtn.addEventListener('click', function () {
  if (!playing) return;
  scores[currentPlayer] += currentScore;
  document.getElementById(`score--${currentPlayer}`).textContent =
    scores[currentPlayer];
  if (scores[currentPlayer] >= 100) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    dice.classList.add('hidden');
    playing = false;
  } else {
    switchPlayer();
  }
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
});

newGame.addEventListener('click', function () {
  scores[0] = 0;
  scores[1] = 0;
  dice.classList.add('hidden');
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  currentScore0EL.textContent = 0;
  currentScore1EL.textContent = 0;
  currentScore = 0;
  if (!playing) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--winner');
  }
  if (currentPlayer) {
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
  }
  currentPlayer = 0;
  playing = true;
});
