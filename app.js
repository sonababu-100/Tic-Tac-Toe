let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let restartBtn = document.querySelector("#restart-btn");
let themeBtn = document.querySelector("#theme-btn");
let statusText = document.querySelector("#status");

let scoreO = document.querySelector("#scoreO");
let scoreX = document.querySelector("#scoreX");

let turnO = true; 
let gameActive = true;
let oWins = 0, xWins = 0;

const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [3,4,5],
  [6,7,8],
  [2,4,6]
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameActive || box.innerText !== "") return;

    box.innerText = turnO ? "O" : "X";
    turnO = !turnO;
    statusText.innerText = turnO ? "Player O's turn" : "Player X's turn";

    checkWinner();
  });
});

function checkWinner() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      boxes[a].classList.add("winner");
      boxes[b].classList.add("winner");
      boxes[c].classList.add("winner");
      statusText.innerText = `${val1} wins 🎉`;
      gameActive = false;

      if (val1 === "O") {
        oWins++;
        scoreO.innerText = oWins;
      } else {
        xWins++;
        scoreX.innerText = xWins;
      }
      return;
    }
  }

  // check for draw
  let allFilled = [...boxes].every(box => box.innerText !== "");
  if (allFilled && gameActive) {
    statusText.innerText = "It's a draw 🤝";
    gameActive = false;
  }
}

// Restart match only (keep scores)
restartBtn.addEventListener("click", () => {
  boxes.forEach(box => {
    box.innerText = "";
    box.classList.remove("winner");
  });
  gameActive = true;
  turnO = true;
  statusText.innerText = "Player O's turn";
});

// Full reset (scores + game)
resetBtn.addEventListener("click", () => {
  oWins = 0;
  xWins = 0;
  scoreO.innerText = "0";
  scoreX.innerText = "0";
  restartBtn.click();
});

// Dark/Light mode
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.innerText = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});


