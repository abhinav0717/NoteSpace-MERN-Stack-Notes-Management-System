
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: '1mb' }));

// Test API
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Notes Management API is running successfully!',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log('--------------------------------');
      console.log('MongoDB connected successfully!');
      console.log(`Server running at http://localhost:${PORT}`);
      console.log('--------------------------------');
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
