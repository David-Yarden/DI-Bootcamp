import { io } from "/socket.io/socket.io.js"

const socket = io()
const entry = document.getElementById("entry")
const chat = document.getElementById("chat")
const joinBtn = document.getElementById("joinBtn")
const leaveBtn = document.getElementById("leaveBtn")
const usernameInput = document.getElementById("username")
const roomInput = document.getElementById("room")
const roomName = document.getElementById("roomName")
const usersList = document.getElementById("usersList")
const messages = document.getElementById("messages")
const msgForm = document.getElementById("msgForm")
const msgInput = document.getElementById("msgInput")
const notifSound = document.getElementById("notifSound")

let current = { username: null, room: null }
let unread = 0
let focused = true

window.addEventListener("focus", () => {
  focused = true
  unread = 0
  document.title = "Chat App"
})
window.addEventListener("blur", () => focused = false)

function addMessage(m) {
  const div = document.createElement("div")
  const time = new Date(m.time).toLocaleTimeString()
  if (m.system) {
    div.className = "message msg-system"
    div.textContent = `${m.text} · ${time}`
  } else {
    div.className = m.username === current.username ? "message msg-me" : "message msg-other"
    const h = document.createElement("div")
    h.textContent = m.username === current.username ? "You" : m.username
    const t = document.createElement("div")
    t.textContent = m.text
    const meta = document.createElement("div")
    meta.className = "msg-meta"
    meta.textContent = time
    div.appendChild(h)
    div.appendChild(t)
    div.appendChild(meta)
  }
  messages.appendChild(div)
  messages.scrollTop = messages.scrollHeight
  if (!focused && !m.system && m.username !== current.username) {
    unread++
    document.title = `(${unread}) New messages`
    try { notifSound.play().catch(()=>{}) } catch(e){}
  }
}

socket.on("message", m => addMessage(m))
socket.on("history", arr => {
  messages.innerHTML = ""
  arr.forEach(addMessage)
})
socket.on("roomUsers", ({room, users}) => {
  roomName.textContent = room
  usersList.innerHTML = ""
  users.forEach(u => {
    const li = document.createElement("li")
    li.textContent = u.username
    if (u.id === socket.id) li.style.fontWeight = "700"
    usersList.appendChild(li)
  })
})
socket.on("privateMessage", pm => {
  const div = document.createElement("div")
  div.className = "message msg-system"
  div.textContent = `Private from ${pm.from}: ${pm.text}`
  messages.appendChild(div)
  messages.scrollTop = messages.scrollHeight
})

joinBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim()
  const room = roomInput.value.trim()
  if (!username || !room) return alert("enter username and room")
  current.username = username
  current.room = room
  entry.classList.add("hidden")
  chat.classList.remove("hidden")
  socket.emit("joinRoom", { username, room })
})

leaveBtn.addEventListener("click", () => {
  socket.emit("leaveRoom")
  chat.classList.add("hidden")
  entry.classList.remove("hidden")
  messages.innerHTML = ""
  usernameInput.value = current.username
  roomInput.value = current.room
  current = { username: null, room: null }
})

msgForm.addEventListener("submit", e => {
  e.preventDefault()
  const text = msgInput.value.trim()
  if (!text) return
  socket.emit("chatMessage", text)
  msgInput.value = ""
  msgInput.focus()
})
