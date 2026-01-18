const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const { authenticateToken } = require('../middleware/auth');
const { findUserById, updateUser, findUserByEmail } = require('../data/users');

// All routes in this file require authentication
router.use(authenticateToken);

// GET /api/protected/profile - Get current user's profile
router.get('/profile', (req, res) => {
    const user = findUserById(req.user.id);

    if (!user) {
        return res.status(404).json({
            error: 'User not found',
            message: 'The authenticated user no longer exists'
        });
    }

    res.json({
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        }
    });
});

// PUT /api/protected/profile - Update current user's profile
router.put('/profile', async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;
        const user = findUserById(req.user.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                message: 'The authenticated user no longer exists'
            });
        }

        const updates = {};

        // Update email if provided
        if (email && email !== user.email) {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    error: 'Validation failed',
                    message: 'Invalid email format'
                });
            }

            // Check if email is already taken
            const existingUser = findUserByEmail(email);
            if (existingUser && existingUser.id !== user.id) {
                return res.status(409).json({
                    error: 'Email taken',
                    message: 'This email is already registered to another user'
                });
            }

            updates.email = email;
        }

        // Update password if provided
        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({
                    error: 'Validation failed',
                    message: 'Current password is required to set a new password'
                });
            }

            // Verify current password
            const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isCurrentPasswordValid) {
                return res.status(401).json({
                    error: 'Authentication failed',
                    message: 'Current password is incorrect'
                });
            }

            // Validate new password
            if (newPassword.length < 8) {
                return res.status(400).json({
                    error: 'Validation failed',
                    message: 'New password must be at least 8 characters long'
                });
            }
            if (!/[A-Z]/.test(newPassword)) {
                return res.status(400).json({
                    error: 'Validation failed',
                    message: 'New password must contain at least one uppercase letter'
                });
            }
            if (!/[a-z]/.test(newPassword)) {
                return res.status(400).json({
                    error: 'Validation failed',
                    message: 'New password must contain at least one lowercase letter'
                });
            }
            if (!/[0-9]/.test(newPassword)) {
                return res.status(400).json({
                    error: 'Validation failed',
                    message: 'New password must contain at least one number'
                });
            }

            // Hash new password
            const saltRounds = 10;
            updates.password = await bcrypt.hash(newPassword, saltRounds);
        }

        // Check if there are any updates to make
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                error: 'No updates',
                message: 'No valid updates provided'
            });
        }

        // Apply updates
        const updatedUser = updateUser(user.id, updates);

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                createdAt: updatedUser.createdAt
            }
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({
            error: 'Update failed',
            message: 'An error occurred while updating profile'
        });
    }
});

// GET /api/protected/dashboard - Example protected route
router.get('/dashboard', (req, res) => {
    res.json({
        message: 'Welcome to the protected dashboard!',
        user: {
            id: req.user.id,
            username: req.user.username
        },
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
