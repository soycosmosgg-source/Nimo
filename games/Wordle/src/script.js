"use strict";

// import data

import { words } from "./words_data.js";

// Elements

const keyboardElement = document.querySelector(".keyboard");

const gridRows = document.querySelectorAll(".grid__row");

const allGridCells = document.querySelectorAll(".grid__cell");

const overlayElement = document.querySelector(".overlay");
const overlayTitle = document.querySelector(".result__title");
const overlayWord = document.querySelector(".result__word");
const overlayPlayed = document.querySelector("#played");
const overlayWin = document.querySelector("#win");
const overlayStreak = document.querySelector("#streak");
const overlayMaxstreak = document.querySelector("#maxStreak");
const restartButton = document.querySelector(".result__restart");

let currentRow = gridRows[0];
let currentCells = currentRow.querySelectorAll(".grid__cell");
const wordLength = currentCells.length;

// data class

class localData {
  constructor() {
    this.played = 0;
    this.win = 0;
    this.maxStreak = 0;
    this.distribution = [];

    this.getData();
    this.saveData();
  }

  saveData() {
    try {
      localStorage.setItem(
        "wordle_local_v1",
        JSON.stringify({
          played: this.played,
          win: this.win,
          maxStreak: this.maxStreak,
          distribution: this.distribution,
        })
      );
    } catch (error) {
      console.log("Error to save data to localstorage");
      console.log("All dta will not be saved");
    }
  }

  getData() {
    let data;
    try {
      data = localStorage.getItem("wordle_local_v1");
    } catch (error) {
      console.log("Error to load data");
      console.log("All data will set to zero");
    }
    if (data === null) {
      data = "{}";
    }

    const { played, win, maxStreak, distribution } = JSON.parse(data);
    // played
    if (played === undefined) {
      this.played = 0;
    } else {
      this.played = played;
    }

    // win
    if (win === undefined) {
      this.win = 0;
    } else {
      this.win = win;
    }

    // maxStreak
    if (maxStreak === undefined) {
      this.maxStreak = 0;
    } else {
      this.maxStreak = maxStreak;
    }

    // distribution
    if (distribution === undefined) {
      this.distribution = [];
    } else {
      this.distribution = distribution;
    }
  }

  clearData() {
    this.played = 0;
    this.win = 0;
    this.maxStreak = 0;
    this.distribution = [];

    this.saveData();
  }
}

const data = new localData();

// Parameters

const gameStage = {
  targetWord: "asaad",
  round: 0,
  cursor: 0,
  streak: 0,
  gameover: false,
};

// functions

function interpolation(min, max, value, maxValue) {
  return (value / maxValue) * max + (min * (maxValue - value)) / maxValue;
}

function updateKeyboardState(guess, targetWord) {
  const targetLetters = targetWord.split('');
  const guessLetters = guess.split('');
  
  guessLetters.forEach((letter, index) => {
    const keyElement = document.getElementById(letter.toUpperCase());
    if (!keyElement) return;
    
    if (letter === targetLetters[index]) {
      keyElement.classList.add('correct');
      keyElement.classList.remove('present', 'absent');
    } else if (targetLetters.includes(letter)) {
      if (!keyElement.classList.contains('correct')) {
        keyElement.classList.add('present');
        keyElement.classList.remove('absent');
      }
    } else {
      if (!keyElement.classList.contains('correct') && !keyElement.classList.contains('present')) {
        keyElement.classList.add('absent');
      }
    }
  });
}

// reset keyboard colors
function resetKeyboard() {
  const keys = document.querySelectorAll('.keyboard__key');
  keys.forEach(key => {
    key.classList.remove('correct', 'present', 'absent');
  });
}

function addLetter(letter) {
  if (gameStage.cursor < wordLength) {
    currentCells[gameStage.cursor].textContent = letter;

    currentCells[gameStage.cursor].classList.remove("grid__cell--full");
    void currentCells[gameStage.cursor].offsetWidth;
    currentCells[gameStage.cursor].classList.remove("grid__cursor");
    currentCells[gameStage.cursor].classList.add("grid__cell--full");

    gameStage.cursor++;

    if (gameStage.cursor < wordLength)
      currentCells[gameStage.cursor].classList.add("grid__cursor");
  }
}

function deleteLetter() {
  let errased = false;

  // letter to delet
  if (gameStage.cursor < wordLength) {
    currentCells[gameStage.cursor].classList.remove("grid__cursor");
    currentCells[gameStage.cursor].classList.remove("grid__cell--full");

    if (currentCells[gameStage.cursor].textContent !== "") {
      currentCells[gameStage.cursor].textContent = "";
      errased = true;
    }
  }

  if (gameStage.cursor > 0) {
    gameStage.cursor += -1;
  }

  // new cursor

  if (errased === false) {
    currentCells[gameStage.cursor].textContent = "";
  }

  currentCells[gameStage.cursor].classList.add("grid__cursor");
  currentCells[gameStage.cursor].classList.remove("grid__cell--full");
}

function enterWord() {
  const word = [...currentCells]
    .map((cell) => cell.textContent)
    .join("")
    .toLocaleLowerCase();

  // check if the word is completed
  if (word.length !== wordLength) {
    showError("La palabra esta incompleta");
    return;
  }

  if (!words.includes(word)) {
    showError("La palabra no es valida");
    return;
  }

  currentCells.forEach((cell) => {
    cell.className = "grid__cell";
  });

  // letter by letter check

  let currentCheck = "0".repeat(wordLength);

  for (let [index, letter] of Object.entries(gameStage.targetWord)) {
    index = Number(index);
    //correct letter and position
    if (letter === word[index]) {
      currentCells[index].classList.add("grid__cell--correct");

      let one = currentCheck.slice(0, index);
      let two = currentCheck.slice(index + 1);
      currentCheck = one + "1" + two;
    }
    // incorrect letter
    else if (gameStage.targetWord.indexOf(word[index]) === -1) {
      currentCells[index].classList.add("grid__cell--absent");
    }
  }

  let currentTarget = gameStage.targetWord
    .split("")
    .map((letter, index) => {
      if (currentCheck[index] === "1") {
        return "@";
      } else {
        return letter;
      }
    })
    .join("");

  for (let index = 0; index < word.length; index++) {
    // check
    if (currentCheck[index] === "1") continue;

    // logic
    let letterIndex = currentTarget.indexOf(word[index]);
    if (letterIndex !== -1) {
      currentCells[index].classList.add("grid__cell--present");

      let one = currentTarget.slice(0, letterIndex);
      let two = currentTarget.slice(letterIndex + 1);
      currentTarget = one + "@" + two;
    } else {
      currentCells[index].classList.add("grid__cell--absent");
    }
  }

  // Update keyboard state
  setTimeout(() => {
    updateKeyboardState(word, gameStage.targetWord);
  }, 300);

  // change round

  if (currentCheck === "1".repeat(wordLength)) {
    finishGame("win");
  } else if (gameStage.round < gridRows.length - 1) {
    currentRow.classList.remove("grid__row--active");

    gameStage.round++;
    gameStage.cursor = 0;

    currentRow = gridRows[gameStage.round];
    currentRow.classList.add("grid__row--active");
    currentCells = currentRow.querySelectorAll(".grid__cell");

    currentCells[0].classList.add("grid__cursor");
  } else {
    finishGame("lose");
  }
}

function finishGame(code) {
  gameStage.gameover = true;

  // show overlay
  overlayElement.classList.add("overlay--show");

  // tittle
  if (code === "win") {
    overlayTitle.textContent = "Ganaste esta ronda";

    data.win += 1;
    gameStage.streak += 1;
    data.distribution.push(gameStage.round);
    if (gameStage.streak > data.maxStreak) {
      data.maxStreak = gameStage.streak;
    }
  } else {
    gameStage.streak = 0;
    gameStage.round++;
    overlayTitle.textContent = "Perdiste esta ronda";
  }

  // update stats
  data.played += 1;
  data.saveData();

  // hidden word
  overlayWord.textContent = gameStage.targetWord;

  // stats

  overlayPlayed.textContent = data.played;
  overlayWin.textContent = `${Math.ceil((100 * data.win) / data.played)}%`;
  overlayStreak.textContent = gameStage.streak;
  overlayMaxstreak.textContent = data.maxStreak;

  // distribution

  const barsElement = document.querySelectorAll(".distribution__bar");

  let count = [];

  for (let index = 0; index < gridRows.length; index++) {
    count.push(data.distribution.filter((n) => n === index).length);
  }

  let maxValue = Math.max(...count);

  for (let index = 0; index < barsElement.length; index++) {
    barsElement[index].style.width = `${interpolation(
      17,
      100,
      count[index],
      maxValue
    )}%`;

    barsElement[index].classList.remove("distribution__bar--current");
    if (gameStage.round === index) {
      barsElement[index].classList.add("distribution__bar--current");
    }
    barsElement[index].textContent = count[index];
  }
}

function showError(msg) {
  if (gameStage.gameover) return;

  const error = document.createElement("div");
  error.textContent = msg;
  error.classList.add("error");

  // Remove existing errors first
  const existingError = document.querySelector(".error");
  if (existingError) {
    document.body.removeChild(existingError);
  }

  document.body.appendChild(error);
  currentRow.classList.remove("grid__row--shake");
  void currentRow.offsetWidth;
  currentRow.classList.add("grid__row--shake");

  setTimeout(() => {
    if (error.parentNode) {
      document.body.removeChild(error);
    }
  }, 4000);
}

function changeCursor(target) {
  if (gameStage.gameover) return;
  if (!target.parentElement.classList.contains("grid__row--active")) return;

  let count = 0;
  currentCells.forEach((cell, index) => {
    cell.classList.remove("grid__cursor");

    if (cell === target) count = index;
  });

  gameStage.cursor = count;
  target.classList.add("grid__cursor");
}

function keyboardHandler({ target }) {
  if (gameStage.gameover) return;

  const id = target.id;

  if (id === "") return;

  switch (id) {
    case "enter":
      enterWord();
      break;
    case "delete":
      deleteLetter();
      break;
    default:
      addLetter(id);
      break;
  }
}

function fisicalKeyboardHandler({ key }) {
  if (gameStage.gameover) {
    if (key === "Enter") {
      restartGame();
    }

    return;
  }

  if (key === "Enter") {
    // enter action
    enterWord();
  }
  // delte action
  else if (key === "Backspace") {
    deleteLetter();
  }
  // move cursor action
  else if (key.includes("Arrow")) {
    // move to left
    if (key === "ArrowLeft") {
      if (gameStage.cursor > 0) {
        changeCursor(currentCells[gameStage.cursor - 1]);
      }
    }
    // move to rigth
    if (key === "ArrowRight") {
      if (gameStage.cursor < wordLength - 1) {
        changeCursor(currentCells[gameStage.cursor + 1]);
      }
    }
  }
  // addleter action
  else if (/^[a-zA-Z]$/.test(key)) {
    addLetter(key.toUpperCase());
  }
}

function restartGame() {
  // close overlay
  overlayElement.classList.remove("overlay--show");

  // restart all cell and rows
  allGridCells.forEach((cell) => {
    cell.className = "grid__cell";
    cell.textContent = "";
  });

  resetKeyboard();

  currentRow = gridRows[0];
  currentCells = currentRow.querySelectorAll(".grid__cell");
  currentCells[0].classList.add("grid__cursor");

  // restart game stage
  gameStage.gameover = false;
  gameStage.cursor = 0;
  gameStage.round = 0;

  // restart

  let randomIndex = parseInt(Math.random() * words.length);

  gameStage.targetWord = words[randomIndex];

  console.log("Target Word:");
  console.log(gameStage.targetWord);
}

// Events listener

keyboardElement.addEventListener("click", keyboardHandler);

allGridCells.forEach((cell) => {
  cell.addEventListener("click", ({ target }) => changeCursor(target));
});

document.addEventListener("keydown", fisicalKeyboardHandler);

restartButton.addEventListener("click", restartGame);

// overlayElement.addEventListener("click", restartGame);

// Init

restartGame();

// dark mode

const darkModeButton = document.querySelector(".dark__mode");
const darkIcon = document.querySelector(".dark");
const ligthIcon = document.querySelector(".ligth");

let dark;
dark = JSON.parse(localStorage.getItem("darkmode_wordle"));
if (dark === null) {
  dark = false;
}
changeMode();

function changeMode() {
  document.body.classList.remove("dark-mode");
  darkIcon.classList.remove("disable");
  ligthIcon.classList.remove("disable");

  if (dark) {
    document.body.classList.add("dark-mode");
    darkIcon.classList.add("disable");
  } else {
    ligthIcon.classList.add("disable");
  }
}

darkModeButton.addEventListener("click", () => {
  dark = !dark;
  changeMode();

  localStorage.setItem("darkmode_wordle", JSON.stringify(dark));
});