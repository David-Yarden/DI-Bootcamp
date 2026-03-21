const db = require('../config/db');

// Register: insert into both users and hashpwd tables inside a transaction
const registerUser = async ({ email, username, first_name, last_name, hashedPassword }) => {
  return db.transaction(async (trx) => {
    const [user] = await trx('users')
      .insert({ email, username, first_name, last_name })
      .returning('*');

    await trx('hashpwd').insert({ username, password: hashedPassword });

    return user;
  });
};

// Find a user + their hashed password for login
const findByUsername = (username) =>
  db('users')
    .join('hashpwd', 'users.username', 'hashpwd.username')
    .where('users.username', username)
    .select('users.*', 'hashpwd.password as hashed_password')
    .first();

const getAllUsers = () =>
  db('users').select('id', 'email', 'username', 'first_name', 'last_name').orderBy('id');

const getUserById = (id) =>
  db('users')
    .where({ id })
    .select('id', 'email', 'username', 'first_name', 'last_name')
    .first();

const updateUser = (id, fields) =>
  db('users').where({ id }).update(fields).returning(['id', 'email', 'username', 'first_name', 'last_name']);

module.exports = { registerUser, findByUsername, getAllUsers, getUserById, updateUser };
