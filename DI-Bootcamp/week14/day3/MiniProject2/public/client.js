const socket = io()

const usernameInput = document.getElementById("username")
const joinBtn = document.getElementById("joinBtn")

const chat = document.getElementById("chat")
const input = document.getElementById("msgInput")
const sendBtn = document.getElementById("sendBtn")

let username = ""

joinBtn.onclick = () => {
  const u = usernameInput.value.trim()
  if (!u) return
  username = u
  socket.emit("join", username)
}

sendBtn.onclick = () => {
  if (!username) return
  const text = input.value.trim()
  if (!text) return
  socket.emit("message", { username, text })
  input.value = ""
}

socket.on("message", data => {
  const p = document.createElement("p")
  p.textContent = data.username + ": " + data.text
  chat.appendChild(p)
})

socket.on("joined", u => {
  const p = document.createElement("p")
  p.textContent = u + " joined"
  chat.appendChild(p)
})
