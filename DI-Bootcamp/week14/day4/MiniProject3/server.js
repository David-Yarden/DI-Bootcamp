import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import path from "path"
import { fileURLToPath } from "url"
import { Game } from "./game.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, "public")))

let game = null

io.on("connection", socket => {

  socket.on("startGame", ({ player1, player2 }) => {
    game = new Game(player1, player2)
    socket.emit("gameState", { grid: game.grid, currentTurn: game.currentTurn })
    io.emit("gameState", { grid: game.grid, currentTurn: game.currentTurn })
  })

  socket.on("move", ({ player, direction }) => {
    if (!game) return
    try {
      const result = game.makeMove(player, direction)
      io.emit("gameState", result)
    } catch (err) {
      socket.emit("errorMsg", err.message)
    }
  })

})
server.listen(3000, () => console.log("Server running on http://localhost:3000"))
