// Random list of words
const wordlist = [
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

// Select a random word from the list
const randomWord = Math.floor(Math.random() * wordlist.length);
console.log(wordlist[randomWord]);

// Word to guess
const word = wordlist[randomWord];

// Word to guess converted to array
const wordArr = word.split("");

// Array to store previous guesses
const prevGuesses = [];

// Array to store previous guesses
const scores = [];

// 180 second timer (3 mins)
let timer = 180;

// Countdown timer
function countdownTimer() {
  const timerInterval = setInterval(function () {
    if (timer <= 0) {
      clearInterval(timerInterval);
    }
    document.querySelector("#timer").innerHTML =
      "Time left: " + timer + " seconds";
    // console.log(timer);
    timer--;
  }, 1000);
}

// Check if exists in array function
function checkAnswer(input) {
  // Check if the word contains the input letter
  if (wordArr.includes(input.toString())) {
    //
    console.log("Correct the word contains " + input);
    // Save previous guesses to an array
    prevGuesses.push(input);
  } else {
    console.log("Try again!");
  }
  checkWin(wordArr, prevGuesses);
}

// Check if user has won
function checkWin(arr, arr2) {
  // Check if every value within prevGuesses contains the values of  wordArray
  if (arr.every((i) => arr2.includes(i))) {
    console.log("You Win!!!!");
    console.log("The correct word is: " + word);
    // Record score
    recordScore("WIN");
    // Reset Game
    resetGame();
  }
}

// Record score and save to local storage
function recordScore(result) {
  scores.push(result);
  localStorage.setItem("scores", scores.toString());
}

// Get scores from local storage
function viewScores() {
  const previousScores = localStorage.getItem("scores");
  console.log(previousScores);
}

// Start Game
function startGame() {
  document.querySelector("main").style.display = "block";
  console.log("start");
  countdownTimer();
}

// Start Button Click
document.querySelector("#startGame").addEventListener("click", startGame);

// Times Up

// Reset Game
function resetGame() {
  clearInterval(timerInterval);
}

// Game Over
function gameOver() {
  //   cons;
}

// Guess
// let guess = prompt("Please enter your guess");
