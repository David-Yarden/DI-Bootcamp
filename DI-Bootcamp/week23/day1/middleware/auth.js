const jwt = require('jsonwebtoken');
const { isTokenRevoked } = require('../data/users');

const authenticateToken = (req, res, next) => {
    // Try to get token from cookie first, then from Authorization header
    let token = req.cookies.accessToken;

    if (!token) {
        const authHeader = req.headers['authorization'];
        token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    }

    if (!token) {
        return res.status(401).json({
            error: 'Access denied',
            message: 'No authentication token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expired',
                message: 'Your session has expired. Please refresh your token or login again.'
            });
        }
        return res.status(403).json({
            error: 'Invalid token',
            message: 'The provided token is invalid'
        });
    }
};

const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            error: 'Refresh token required',
            message: 'No refresh token provided'
        });
    }

    // Check if token has been revoked
    if (isTokenRevoked(refreshToken)) {
        return res.status(403).json({
            error: 'Token revoked',
            message: 'This refresh token has been revoked'
        });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        req.user = decoded;
        req.refreshToken = refreshToken;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Refresh token expired',
                message: 'Your refresh token has expired. Please login again.'
            });
        }
        return res.status(403).json({
            error: 'Invalid refresh token',
            message: 'The provided refresh token is invalid'
        });
    }
};

module.exports = {
    authenticateToken,
    verifyRefreshToken
};
