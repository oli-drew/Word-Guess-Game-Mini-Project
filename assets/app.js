// Random list of words
const wordList = [
  "airport",
  "cheese",
  "curve",
  "perform",
  "boring",
  "approval",
  "homely",
  "absurd",
  "tail",
  "cat",
];

// Word to guess
let word = "";

// Word length
let wordLength = 0;

// Word to guess converted to array
let wordArr = [];

// Array to store previous guesses
let prevGuesses = [];

// Array to store previous guesses
const scores = [];

// 180 second timer (3 mins)
let timer = 18;

// Select a random word from the list
function randomWord() {
  rand = Math.floor(Math.random() * wordList.length);
  word = wordList[rand];
  wordLength = word.length;
  // converted to array
  wordArr = word.split("");
}

// Countdown timer
let timerInterval;
function countdownTimer() {
  document.querySelector("#timer").innerHTML =
    "Time left: " + timer + " seconds";
  timerInterval = setInterval(function () {
    timer--;
    if (timer === 0) {
      document.querySelector("#timer").innerHTML = "Times up!";
      clearInterval(timerInterval);
      gameOver();
    } else {
      document.querySelector("#timer").innerHTML =
        "Time left: " + timer + " seconds";
    }
  }, 1000);
}

// Word element
const wordElement = document.querySelector("#word");

// Display word as blanks
function displayWord() {
  for (let i = 0; i < wordLength; i++) {
    // Create span element containing an underscore
    // Set a data parameter as the letter
    const spanEl = document.createElement("span");
    spanEl.textContent = "_";
    spanEl.setAttribute("class", `letter-${wordArr[i]}`);
    wordElement.appendChild(spanEl);
    // console.log(wordArr[i]);
  }
}

// Check answer on keydown event
function keydownAction(event) {
  checkAnswer(event.key);
}

// Check if exists in array function
function checkAnswer(input) {
  // Check if the word contains the input letter
  if (wordArr.includes(input.toString())) {
    console.log("Correct the word contains " + input);
    // Replace blank with letter
    replaceBlank(input);
    // Save previous guesses to an array
    saveGuess(input);
  } else {
    console.log("Try again!");
    saveGuess(input);
  }
  checkWin(wordArr, prevGuesses);
}

// Replace blank with letter
function replaceBlank(correctLetter) {
  const letters = document.querySelectorAll(`.letter-${correctLetter}`);
  letters.forEach((letter) => (letter.textContent = correctLetter));
}

// Check if user has won
function checkWin(arr, arr2) {
  // Check if every value within prevGuesses contains the values of  wordArray
  if (arr.every((i) => arr2.includes(i))) {
    console.log("You Win!!!!");
    console.log("The correct word is: " + word);
    // Win
    winner();
  }
}

// Start Game
function startGame() {
  document.querySelector("main").style.display = "block";
  resetGame();
  console.log("start");
  randomWord();
  console.log(word);
  console.log(`Word length: ${wordLength}`);
  displayWord();
  document.addEventListener("keydown", keydownAction);
  countdownTimer();
}

// Start Button Click
document.querySelector("#startGame").addEventListener("click", startGame);

// Save previous guess
const prevGuessEl = document.querySelector("#previousGuesses");
function saveGuess(guess) {
  prevGuesses.push(guess);
  // Sort
  prevGuesses.sort();
  // Remove duplicates
  prevGuesses = prevGuesses.filter((e, i, a) => e !== a[i - 1]);
  prevGuessEl.textContent = prevGuesses;
}

// Record score and save to local storage
function recordScore(result) {
  let prevScores = getScores();
  let newScores = "";
  if (prevScores) {
    newScores = prevScores + "," + result;
  } else {
    newScores = result;
  }
  localStorage.setItem("scores", newScores);
  // scoresEl.textContent = newScores;
  displayScores(newScores);
}

// Get scores from local storage
function getScores() {
  return localStorage.getItem("scores");
}

// Display scores
const scoresEl = document.querySelector("#scores");
function displayScores(scores) {
  scoresEl.textContent = scores;
}

// Game Over
function gameOver() {
  wordElement.innerHTML = "Game Over! - The correct answer was: " + word;
  recordScore("loss");
}

// Win
function winner() {
  wordElement.innerHTML = "WINNER!!!";
  // scores.push("win");
  recordScore("win");
  clearInterval(timerInterval);
}

// Reset Game
function resetGame() {
  clearInterval(timerInterval);
  prevGuesses = [];
  timer = 18;
  wordElement.innerHTML = "";
  prevGuessEl.innerHTML = "";
}

// On page load
document.onload = displayScores(getScores());
