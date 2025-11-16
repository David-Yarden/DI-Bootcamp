import { Router } from "express"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const router = Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, "../data/tasks.json")

const readTasks = () => JSON.parse(fs.readFileSync(filePath))
const writeTasks = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

router.get("/", (req, res, next) => {
  try {
    const tasks = readTasks()
    res.json(tasks)
  } catch (e) {
    next(e)
  }
})

router.get("/:id", (req, res, next) => {
  try {
    const tasks = readTasks()
    const task = tasks.find(t => t.id === req.params.id)
    if (!task) return res.status(404).json({ error: "not found" })
    res.json(task)
  } catch (e) {
    next(e)
  }
})

router.post("/", (req, res, next) => {
  try {
    const { title, completed } = req.body
    if (!title) return res.status(400).json({ error: "title required" })
    const tasks = readTasks()
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: completed ?? false
    }
    tasks.push(newTask)
    writeTasks(tasks)
    res.status(201).json(newTask)
  } catch (e) {
    next(e)
  }
})

router.put("/:id", (req, res, next) => {
  try {
    const { title, completed } = req.body
    if (title == null && completed == null) return res.status(400).json({ error: "nothing to update" })
    const tasks = readTasks()
    const index = tasks.findIndex(t => t.id === req.params.id)
    if (index === -1) return res.status(404).json({ error: "not found" })
    const updated = { ...tasks[index], title: title ?? tasks[index].title, completed: completed ?? tasks[index].completed }
    tasks[index] = updated
    writeTasks(tasks)
    res.json(updated)
  } catch (e) {
    next(e)
  }
})

router.delete("/:id", (req, res, next) => {
  try {
    const tasks = readTasks()
    const index = tasks.findIndex(t => t.id === req.params.id)
    if (index === -1) return res.status(404).json({ error: "not found" })
    const deleted = tasks.splice(index, 1)[0]
    writeTasks(tasks)
    res.json(deleted)
  } catch (e) {
    next(e)
  }
})

export default router
