import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static(path.join(__dirname, "public")))

io.on("connection", socket => {
  socket.on("join", username => {
    socket.data.username = username
    io.emit("joined", username)
  })

  socket.on("message", data => {
    io.emit("message", data)
  })
})

server.listen(3000, () => console.log("Server running on http://localhost:3000"))
