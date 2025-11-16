import express from "express"
import tasksRouter from "./routes/tasks.js"

const app = express()
app.use(express.json())
app.use("/tasks", tasksRouter)

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message })
})

const PORT = 3000
app.listen(PORT, () => console.log("running"))
