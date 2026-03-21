const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_FILE = path.join(__dirname, 'users.json');
const SALT_ROUNDS = 10;

app.use(express.json());
app.use(express.static(__dirname)); // serve HTML files

// ── Helpers ──────────────────────────────────────────────────────────────────

const readUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  } catch (err) {
    throw new Error('Failed to read users file: ' + err.message);
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    throw new Error('Failed to write users file: ' + err.message);
  }
};

const nextId = (users) =>
  users.length === 0 ? 1 : Math.max(...users.map((u) => u.id)) + 1;

// ── Routes ───────────────────────────────────────────────────────────────────

const router = express.Router();

// POST /register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const users = readUsers();

    if (users.find((u) => u.username === username)) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    if (users.find((u) => u.email === email)) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = {
      id: nextId(users),
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    };

    users.push(newUser);
    writeUsers(users);

    const { password: _, ...safeUser } = newUser;
    res.status(201).json({ message: 'User registered successfully', user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const users = readUsers();
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Username is not registered' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const { password: _, ...safeUser } = user;
    res.json({ message: 'Login successful', user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users
router.get('/users', (req, res) => {
  try {
    const users = readUsers().map(({ password, ...u }) => u);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users/:id
router.get('/users/:id', (req, res) => {
  try {
    const users = readUsers();
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /users/:id
router.put('/users/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    if (!firstName && !lastName && !email && !username && !password) {
      return res.status(400).json({ error: 'Provide at least one field to update' });
    }

    const users = readUsers();
    const index = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    if (username && username !== users[index].username && users.find((u) => u.username === username)) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    if (email && email !== users[index].email && users.find((u) => u.email === email)) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    if (firstName) users[index].firstName = firstName;
    if (lastName) users[index].lastName = lastName;
    if (email) users[index].email = email;
    if (username) users[index].username = username;
    if (password) users[index].password = await bcrypt.hash(password, SALT_ROUNDS);

    writeUsers(users);

    const { password: _, ...safeUser } = users[index];
    res.json(safeUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/', router);

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
  console.log(`Task API #2 running at http://localhost:${PORT}`);
  console.log(`  Register: http://localhost:${PORT}/register.html`);
  console.log(`  Login:    http://localhost:${PORT}/login.html`);
});
