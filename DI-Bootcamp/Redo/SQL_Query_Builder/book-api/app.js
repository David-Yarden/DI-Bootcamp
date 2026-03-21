const express = require('express');
const bookRoutes = require('./server/routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// 404 handler for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Book API server running at http://localhost:${PORT}`);
});
