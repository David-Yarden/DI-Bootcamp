let board = Array(9).fill(null);
let playerSymbol = "X";
let aiSymbol = "O";
let currentDifficulty = "easy";
let gameOver = false;

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[6,4,2]
];

// Player chooses X or O
function chooseSymbol(symbol) {
  playerSymbol = symbol;
  aiSymbol = symbol === "X" ? "O" : "X";
  document.getElementById("status").innerText = `You are ${playerSymbol}`;
}

// Set difficulty
function setDifficulty(level) {
  currentDifficulty = level;
  document.getElementById("status").innerText = `Difficulty: ${level}`;
}

// Handle player turn
function playerTurn(index) {
  if (gameOver || board[index]) return;

  board[index] = playerSymbol;
  document.getElementById(index).innerText = playerSymbol;

  if (checkWinner(board, playerSymbol)) {
    endGame(`You win!`);
    return;
  }

  if (board.every(cell => cell)) {
    endGame("Tie game!");
    return;
  }

  aiTurn();
}

// AI move
function aiTurn() {
  let move;
  if (currentDifficulty === "easy") {
    // Random move
    let empty = board.map((v,i) => v ? null : i).filter(v => v !== null);
    move = empty[Math.floor(Math.random() * empty.length)];
  } else {
    // Hard mode: use minimax
    move = minimax(board, aiSymbol).index;
  }

  board[move] = aiSymbol;
  document.getElementById(move).innerText = aiSymbol;

  if (checkWinner(board, aiSymbol)) {
    endGame("Computer wins!");
    return;
  }

  if (board.every(cell => cell)) {
    endGame("Tie game!");
    return;
  }
}

// Minimax algorithm for unbeatable AI
function minimax(newBoard, player) {
  let empty = newBoard.map((v,i) => v ? null : i).filter(v => v !== null);

  if (checkWinner(newBoard, playerSymbol)) return { score: -10 };
  if (checkWinner(newBoard, aiSymbol)) return { score: 10 };
  if (empty.length === 0) return { score: 0 };

  let moves = [];

  for (let i of empty) {
    let move = {};
    move.index = i;
    newBoard[i] = player;

    if (player === aiSymbol) {
      let result = minimax(newBoard, playerSymbol);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, aiSymbol);
      move.score = result.score;
    }

    newBoard[i] = null;
    moves.push(move);
  }

  let bestMove;
  if (player === aiSymbol) {
    let bestScore = -Infinity;
    moves.forEach((m,i) => {
      if (m.score > bestScore) {
        bestScore = m.score;
        bestMove = i;
      }
    });
  } else {
    let bestScore = Infinity;
    moves.forEach((m,i) => {
      if (m.score < bestScore) {
        bestScore = m.score;
        bestMove = i;
      }
    });
  }

  return moves[bestMove];
}

// Check winner
function checkWinner(board, player) {
  return winCombos.some(combo =>
    combo.every(index => board[index] === player)
  );
}

// End game
function endGame(message) {
  gameOver = true;
  document.getElementById("status").innerText = message;
  document.getElementById("restartBtn").style.display = "block";
}

// Restart
function restartGame() {
  board.fill(null);
  gameOver = false;
  document.getElementById("status").innerText = "";
  document.querySelectorAll("td").forEach(td => td.innerText = "");
  document.getElementById("restartBtn").style.display = "none";
}
