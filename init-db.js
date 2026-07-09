const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// Manually load .env.local since this script runs outside Next.js
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^\s*DATABASE_URL\s*=\s*["']?(.*?)["']?\s*$/);
    if (match) {
      process.env.DATABASE_URL = match[1];
    }
  });
}

// Fallback to local if nothing is found (but it will find your Supabase string now)
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:5432/daily_pulse';

async function init() {
  console.log('Attempting to connect to database...');
  const client = new Client({ 
    connectionString,
    ssl: connectionString.includes('supabase') ? { rejectUnauthorized: false } : false
  });
  
  try {
    await client.connect();
    console.log('Successfully connected to Supabase PostgreSQL cluster.');

    // Create the Master Businesses Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS businesses (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        branch_name TEXT NOT NULL,
        google_review_url TEXT NOT NULL,
        manager_whatsapp TEXT NOT NULL,
        language_preference TEXT NOT NULL DEFAULT 'english',
        is_active BOOLEAN NOT NULL DEFAULT true
      );
    `);
    console.log('✓ Businesses table verified/created.');

    // Insert initial pilot sample data if empty
    const checkData = await client.query('SELECT count(*) FROM businesses');
    if (parseInt(checkData.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO businesses (id, name, branch_name, google_review_url, manager_whatsapp, language_preference, is_active)
        VALUES 
        ('demo-001', 'Slotly Salon', 'Gulberg, Lahore', 'https://google.com', '923001234567', 'roman_urdu', true),
        ('demo-002', 'Slotly Salon', 'DHA Phase 5', 'https://google.com', '923001234567', 'urdu', true),
        ('demo-003', 'Slotly Salon', 'Johar Town', 'https://google.com', '923001234567', 'english', false);
      `);
      console.log('✓ Pilot demo accounts seeded successfully.');
    }

  } catch (err) {
    console.error('Database initialization error:', err);
  } finally {
    await client.end();
  }
}

init();