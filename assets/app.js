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
  "scientific",
  "appreciate",
  "red",
  "laughable",
  "quiver",
  "interrupt",
  "pollution",
  "fair",
  "cynical",
  "hover",
];

// Word to guess
let word = "";
// Word length
let wordLength = 0;
// Word to guess array
let wordArr = [];
// Array to store previous guesses
let prevGuesses = [];
// Array to store previous guesses
const scores = [];
// Timer
let timer = 0;

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
// function keydownAction(event)
const keydownAction = (event) => {
  checkAnswer(event.key.toLowerCase());
};

// Alternate to keydown for mobile
const mobileInputAction = (e) => {
  checkAnswer(e.data.toLowerCase());
  mobileInput.value = "";
};

// Check if exists in array function
function checkAnswer(input) {
  // Check if the word contains the input letter
  if (wordArr.includes(input.toString())) {
    // console.log("Correct the word contains " + input);
    // Replace blank with letter
    replaceBlank(input);
    // Save previous guesses to an array
    saveGuess(input);
  } else {
    // console.log("Try again!");
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
    // console.log("You Win!!!!");
    // console.log("The correct word is: " + word);
    // Win
    winner();
  }
}

// Start Game
function startGame() {
  document.querySelector("#guesses").style.display = "block";
  resetGame();
  // Focus input to open mobile Keyboard
  // document.querySelector("#mobile-input").focus();
  // console.log("start");
  randomWord();
  // console.log(word);
  // console.log(`Word length: ${wordLength}`);
  mobileChecker();
  displayWord();
  // document.addEventListener("keydown", keydownAction); // remove comment to fix
  countdownTimer();
}

// Mobile or Desktop
function mobileChecker() {
  if (window.matchMedia("(min-width: 1025px)")) {
    document.addEventListener("keydown", keydownAction);
  } else {
    const mobileInput = document.getElementById("mobile-input");
    mobileInput.focus();
    mobileInput.addEventListener("input", mobileInputAction);
  }
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

// Record win
function recordWin() {
  let win = localStorage.getItem("win");
  win++;
  localStorage.setItem("win", win.toString());
  displayScores();
}

// Record loss
function recordLoss() {
  let loss = localStorage.getItem("loss");
  loss++;
  localStorage.setItem("loss", loss.toString());
  displayScores();
}

// Display scores
const winEl = document.querySelector("#win");
const lossEl = document.querySelector("#loss");
function displayScores() {
  if (localStorage.getItem("win")) {
    winEl.textContent = `Wins: ${localStorage.getItem("win")}`;
  } else {
    winEl.textContent = "Wins: 0";
  }

  if (localStorage.getItem("loss")) {
    lossEl.textContent = `Losses: ${localStorage.getItem("loss")}`;
  } else {
    lossEl.textContent = "Losses: 0";
  }
}

// Game Over
function gameOver() {
  wordElement.innerHTML = "Game Over!";
  recordLoss();
}

// Win
function winner() {
  wordElement.innerHTML = "You win!";
  recordWin();
  clearInterval(timerInterval);
}

// Reset Game
function resetGame() {
  clearInterval(timerInterval);
  prevGuesses = [];
  timer = 30;
  wordElement.innerHTML = "";
  prevGuessEl.innerHTML = "";
}

// On page load
document.onload = displayScores();
