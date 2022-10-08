let playerScore = 0;
let cpuScore = 0;

function getComputerChoice() {
  const choices = ['ROCK', 'PAPER', 'SCISSORS'];
  return choices[Math.floor(Math.random()*choices.length)];
  }

function playRound(playerSelection) {
  let computerSelection = getComputerChoice();
  playerSelection = playerSelection.toUpperCase();

  if (playerSelection === computerSelection) {
    console.log(`Draw! You both chose ${playerSelection}.`);
    return "DRAW";
  }

  switch(playerSelection) {
    case "ROCK":
      if (computerSelection === "SCISSORS") {
        console.log('You win! ROCK beats SCISSORS.');
        playerScore++;
        return "WIN";
      } else {
        console.log('You lose! PAPER beats ROCK.');
        cpuScore++;
        return "LOSE";
      }
    case "PAPER":
      if (computerSelection === "ROCK") {
        console.log('You win! PAPER beats ROCK.');
        playerScore++;
        return "WIN";
      } else {
        console.log('You lose! SCISSORS beats PAPER.');
        cpuScore++;
        return "LOSE";
      }
    case "SCISSORS":
      if (computerSelection === "PAPER") {
        console.log('You win! SCISSORS beats PAPER.');
        playerScore++;
        return "WIN";
      } else {
        console.log('You lose! ROCK beats SCISSORS.');
        cpuScore++;
        return "LOSE";
      }
  }
}

function reset() {
  playerScore = 0;
  cpuScore = 0;
}

function checkWinner() {
  if (playerScore == 5) {
    return 1;
  } else if (cpuScore == 5) {
    return -1;
  }
  return 0;
}

function endGame() {
  if (checkWinner() == 1) {
    endResult.textContent = "YOU WIN!";
    keepingTrack.appendChild(endResult);
  } else if (checkWinner() == -1) {
    endResult.textContent = "YOU LOSE!";
    keepingTrack.appendChild(endResult);
  }
}

const buttons = document.querySelectorAll('.btn');
const score = document.querySelector('#score');
const keepingTrack = document.querySelector('.keeping-track');
const endResult = document.createElement('div');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    playRound(button.id);
    score.textContent = playerScore + ' - ' + cpuScore;
    if (checkWinner()) endGame();
  });
});