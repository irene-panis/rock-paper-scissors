let playerScore = 0;
let cpuScore = 0;

function getComputerChoice() {
  const choices = ['ROCK', 'PAPER', 'SCISSORS'];
  return choices[Math.floor(Math.random()*choices.length)];
  }

function playRound(playerSelection, computerSelection) {
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
  updateScore();
}

function checkWinner() {
  if (playerScore == 5) {
    return 1;
  } else if (cpuScore == 5) {
    return -1;
  }
  return 0;
}

const retry = document.querySelector('#retry');
retry.addEventListener('click', () => {
  reset();
  retry.innerHTML = "Reset";
  document.getElementById("question").innerHTML = "What will you choose?";
})

function endGame() {
  const question = document.querySelector('#question');
  if (checkWinner() == 1) {
    question.textContent = "YOU WON THE GAME!";
  } else if (checkWinner() == -1) {
    question.textContent = "YOU LOST THE GAME.";
  }
  retry.innerHTML = "Try again";
  disableButtons();
  document.getElementById("retry").disabled = false;
}

const buttons = document.querySelectorAll('.btn');
const score = document.querySelector('#score');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    disableButtons();
    document.getElementById("retry").disabled = true;
    let computerSelection = getComputerChoice();
    let result = playRound(button.id, computerSelection);
    makeActiveYou(button);
    setTimeout(makeActiveCpu, 4000, computerSelection);
    writeChoice(button.id.toUpperCase(), computerSelection);
    setTimeout(checkCorrect, 7000, result);
    setTimeout(updateScore, 7000);
    setTimeout(resetStates, 10000);
  });
});

function disableButtons() {
  document.getElementById("rock").disabled = true;
  document.getElementById("paper").disabled = true;
  document.getElementById("scissors").disabled = true;
}

function enableButtons() {
  document.getElementById("rock").disabled = false;
  document.getElementById("paper").disabled = false;
  document.getElementById("scissors").disabled = false;
}

function updateScore() {
  score.textContent = playerScore + ' - ' + cpuScore;
}

function makeActiveYou(identifier) {
  let idFormatted = '#' + identifier.parentNode.id;
  const choice = document.querySelector(idFormatted);
  choice.classList.add('youChose');
}

function makeActiveCpu(identifier) {
  let choiceFormatted = formatCpuChoice(identifier);
  const choice = document.querySelector(choiceFormatted);
  choice.classList.add('cpuChose');
}

function resetStates() {
  const polaroids = document.querySelectorAll(".polaroid");
  polaroids.forEach((polaroid) => {
    polaroid.classList.remove("youChose");
    polaroid.classList.remove("cpuChose");
  })
  if (checkWinner()) {
    endGame();
    return;
  } else {
    document.getElementById("question").innerHTML = "What will you choose?";
  }
  setTimeout(() => {
    enableButtons();
    document.getElementById("retry").disabled = false;
  }, 2000);
}

function formatCpuChoice(str) {
  return "#option" + str.charAt(0) + str.slice(1).toLowerCase();
}

function writeChoice(yours, theirs) {
  document.getElementById("question").innerHTML = `YOU CHOSE ${yours}`;
  setTimeout(() => {
    document.getElementById("question").innerHTML = `CPU CHOSE ${theirs}`;
  }, 4000);
}

function checkCorrect(result) {
  switch(result) {
    case "WIN":
      document.getElementById("question").innerHTML = `YOU WIN.`; break;
    case "LOSE":
      document.getElementById("question").innerHTML = `YOU LOSE.`; break;
    case "DRAW":
      document.getElementById("question").innerHTML = `DRAW.`; break;
  }
}
