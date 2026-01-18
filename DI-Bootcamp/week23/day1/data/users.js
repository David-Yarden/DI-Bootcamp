// In-memory user data store
// In production, replace this with a proper database (MongoDB, PostgreSQL, etc.)

const users = [];

// Store for revoked refresh tokens (for logout functionality)
const revokedTokens = new Set();

const findUserByUsername = (username) => {
    return users.find(user => user.username === username);
};

const findUserByEmail = (email) => {
    return users.find(user => user.email === email);
};

const findUserById = (id) => {
    return users.find(user => user.id === id);
};

const createUser = (userData) => {
    const newUser = {
        id: users.length + 1,
        username: userData.username,
        email: userData.email,
        password: userData.password, // Already hashed
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
};

const updateUser = (id, updateData) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    users[userIndex] = { ...users[userIndex], ...updateData };
    return users[userIndex];
};

const revokeToken = (token) => {
    revokedTokens.add(token);
};

const isTokenRevoked = (token) => {
    return revokedTokens.has(token);
};

module.exports = {
    users,
    findUserByUsername,
    findUserByEmail,
    findUserById,
    createUser,
    updateUser,
    revokeToken,
    isTokenRevoked
};
