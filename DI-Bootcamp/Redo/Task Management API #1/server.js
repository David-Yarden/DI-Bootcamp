const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const TASKS_FILE = path.join(__dirname, 'tasks.json');

app.use(express.json());

// ── Helpers ──────────────────────────────────────────────────────────────────

const readTasks = () => {
  try {
    const data = fs.readFileSync(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error('Failed to read tasks file: ' + err.message);
  }
};

const writeTasks = (tasks) => {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
  } catch (err) {
    throw new Error('Failed to write tasks file: ' + err.message);
  }
};

const nextId = (tasks) =>
  tasks.length === 0 ? 1 : Math.max(...tasks.map((t) => t.id)) + 1;

// ── Routes ───────────────────────────────────────────────────────────────────

const router = express.Router();

// GET /tasks — all tasks
router.get('/', (req, res) => {
  try {
    const tasks = readTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /tasks/:id — single task
router.get('/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /tasks — create task
router.post('/', (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });

    const tasks = readTasks();
    const newTask = {
      id: nextId(tasks),
      title,
      description: description || '',
      status: status || 'pending',
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /tasks/:id — update task
router.put('/:id', (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title && !description && !status) {
      return res.status(400).json({ error: 'Provide at least one field to update: title, description, or status' });
    }

    const tasks = readTasks();
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    if (title) tasks[index].title = title;
    if (description !== undefined) tasks[index].description = description;
    if (status) tasks[index].status = status;
    tasks[index].updatedAt = new Date().toISOString();

    writeTasks(tasks);
    res.json(tasks[index]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /tasks/:id — delete task
router.delete('/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    const [deleted] = tasks.splice(index, 1);
    writeTasks(tasks);
    res.json({ message: 'Task deleted successfully', task: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/tasks', router);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Task Management API running at http://localhost:${PORT}`);
});
