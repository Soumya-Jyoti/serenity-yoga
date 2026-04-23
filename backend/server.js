/**
 * Entry point for the Serenity Yoga Studio backend.
 * Sets up Express with CORS, JSON parsing, and routes.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'https://serenity-yoga-studio-red.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Serenity Yoga Studio API is running 🧘' });
});

// Export for potential serverless use
module.exports = app;

// Start server — Railway/Render need a persistent listener
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
