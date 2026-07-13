import { Client } from "pg";

async function main() {
  const connectionString = "postgresql://postgres.eqgkpozlugpsviclaqvm:fuBn9hX4u!*T7_VE@15.206.124.238:5432/postgres?sslmode=require";

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to Supabase via direct IP and port 5432.");

    await client.query(`
      ALTER TABLE businesses 
      ADD COLUMN IF NOT EXISTS service_tier VARCHAR(20) DEFAULT 'basic';
    `);

    console.log("✓ Column 'service_tier' added/verified on 'businesses' table.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await client.end();
  }
}

main();
