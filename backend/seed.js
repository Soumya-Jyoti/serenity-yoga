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
    console.log('\n💡 Tip: Make sure your .env variables are correct and the MySQL server is reachable.');
    process.exit(1);
  }
}

seed();
