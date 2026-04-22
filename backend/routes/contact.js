/**
 * Contact routes — handles contact form submissions.
 * POST /api/contact — publicly submit a contact form
 * GET  /api/contact — admin-only, retrieve all submissions (newest first)
 */

const express = require('express');
const pool = require('../config/db');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

// POST /api/contact — save a new contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    await pool.query(
      'INSERT INTO contact_submissions (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );

    res.status(201).json({ message: 'Your message has been sent successfully!' });
  } catch (err) {
    console.error('Contact submit error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// GET /api/contact — admin-only: retrieve all submissions
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    );
    res.json({ submissions: rows });
  } catch (err) {
    console.error('Contact fetch error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
