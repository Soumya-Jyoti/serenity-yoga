/**
 * Seed script — verifies connection and creates an initial admin user.
 */

const pool = require('./config/db');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    console.log('⏳ Connecting to database...');
    const [rows] = await pool.query('SELECT 1');
    console.log('✅ Database connected successfully!');

    // Create users table if not exists
    console.log('⏳ Creating users table if not exists...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create contact_submissions table if not exists
    console.log('⏳ Creating contact_submissions table if not exists...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const email = 'admin@serenity.yoga';
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);

    if (existing.length > 0) {
      console.log('ℹ️ Admin user already exists.');
    } else {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Serenity Admin', email, hashedPassword, 'admin']
      );
      console.log('🎉 Initial Admin created!');
      console.log('📧 Email: admin@serenity.yoga');
      console.log('🔑 Password: admin123');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err.message);
    process.exit(1);
  }
}

seed();
