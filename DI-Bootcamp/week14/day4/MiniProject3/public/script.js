const socket = io()

const setup = document.getElementById("setup")
const gameDiv = document.getElementById("game")
const gridEl = document.getElementById("grid")
const turnEl = document.getElementById("turn")
const winnerEl = document.getElementById("winner")
const startBtn = document.getElementById("startBtn")
const buttons = document.querySelectorAll("button[data-dir]")

let player = null

function renderGrid(grid) {
  gridEl.innerHTML = ""
  for (let i=0;i<grid.length;i++){
    const tr = document.createElement("tr")
    for (let j=0;j<grid[i].length;j++){
      const td = document.createElement("td")
      td.textContent = grid[i][j] || ""
      tr.appendChild(td)
    }
    gridEl.appendChild(tr)
  }
}

startBtn.onclick = () => {
  const p1 = document.getElementById("p1").value.trim()
  const p2 = document.getElementById("p2").value.trim()
  if (!p1 || !p2) return alert("Enter both player names")
  player = p1
  socket.emit("startGame", { player1: p1, player2: p2 })
  setup.classList.add("hidden")
  gameDiv.classList.remove("hidden")
}

buttons.forEach(btn => {
  btn.onclick = () => {
    if (!player) return
    const dir = btn.dataset.dir
    socket.emit("move", { player, direction: dir })
  }
})

socket.on("gameState", data => {
  renderGrid(data.grid)
  turnEl.textContent = "Turn: " + data.currentTurn
  winnerEl.textContent = data.winner ? "Winner: "+data.winner : ""
})

socket.on("errorMsg", msg => alert(msg))
