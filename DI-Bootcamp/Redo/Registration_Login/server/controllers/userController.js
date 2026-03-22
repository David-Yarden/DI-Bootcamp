const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const SALT_ROUNDS = 10;

// POST /register
const register = async (req, res) => {
  try {
    const { email, username, first_name, last_name, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'email, username, and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.registerUser({ email, username, first_name, last_name, hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

// POST /login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }

    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const { hashed_password, ...safeUser } = user;
    res.json({ message: 'Login successful', user: safeUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /users/:id
const updateUser = async (req, res) => {
  try {
    const { email, username, first_name, last_name } = req.body;
    const fields = {};
    if (email) fields.email = email;
    if (username) fields.username = username;
    if (first_name) fields.first_name = first_name;
    if (last_name) fields.last_name = last_name;

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ error: 'No fields provided to update' });
    }

    const [user] = await User.updateUser(req.params.id, fields);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, getAllUsers, getUserById, updateUser };
