const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const {
    findUserByUsername,
    findUserByEmail,
    createUser,
    revokeToken
} = require('../data/users');
const { verifyRefreshToken } = require('../middleware/auth');

// Validation helpers
const validateUsername = (username) => {
    // Username must be 3-20 characters, alphanumeric and underscores only
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!username) return 'Username is required';
    if (!usernameRegex.test(username)) {
        return 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
    }
    return null;
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Invalid email format';
    return null;
};

const validatePassword = (password) => {
    // Password must be at least 8 characters with at least one uppercase, one lowercase, and one number
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    return null;
};

// Generate tokens
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

// Set cookies helper
const setTokenCookies = (res, accessToken, refreshToken) => {
    // Access token cookie - short lived
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 // 1 hour
    });

    // Refresh token cookie - longer lived
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        const usernameError = validateUsername(username);
        if (usernameError) {
            return res.status(400).json({ error: 'Validation failed', message: usernameError });
        }

        const emailError = validateEmail(email);
        if (emailError) {
            return res.status(400).json({ error: 'Validation failed', message: emailError });
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            return res.status(400).json({ error: 'Validation failed', message: passwordError });
        }

        // Check if user already exists
        if (findUserByUsername(username)) {
            return res.status(409).json({
                error: 'User exists',
                message: 'Username is already taken'
            });
        }

        if (findUserByEmail(email)) {
            return res.status(409).json({
                error: 'User exists',
                message: 'Email is already registered'
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const newUser = createUser({
            username,
            email,
            password: hashedPassword
        });

        // Generate tokens
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        // Set cookies
        setTokenCookies(res, accessToken, refreshToken);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                createdAt: newUser.createdAt
            },
            accessToken, // Also return in body for API clients
            refreshToken
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            error: 'Registration failed',
            message: 'An error occurred during registration'
        });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                error: 'Validation failed',
                message: 'Username and password are required'
            });
        }

        // Find user
        const user = findUserByUsername(username);
        if (!user) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Invalid username or password'
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Authentication failed',
                message: 'Invalid username or password'
            });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Set cookies
        setTokenCookies(res, accessToken, refreshToken);

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Login failed',
            message: 'An error occurred during login'
        });
    }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    // Revoke the refresh token if it exists
    if (refreshToken) {
        revokeToken(refreshToken);
    }

    // Clear cookies
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.json({
        message: 'Logged out successfully'
    });
});

// POST /api/auth/refresh
router.post('/refresh', verifyRefreshToken, (req, res) => {
    try {
        // Revoke old refresh token
        revokeToken(req.refreshToken);

        // Generate new tokens
        const accessToken = generateAccessToken(req.user);
        const refreshToken = generateRefreshToken(req.user);

        // Set new cookies
        setTokenCookies(res, accessToken, refreshToken);

        res.json({
            message: 'Tokens refreshed successfully',
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({
            error: 'Refresh failed',
            message: 'An error occurred while refreshing tokens'
        });
    }
});

module.exports = router;
