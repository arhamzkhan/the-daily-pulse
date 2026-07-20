/**
 * lib/seed.ts
 * Seed script — inserts demo business record with full server-side validation.
 * Run: npx ts-node --project tsconfig.json lib/seed.ts
 */
import db from "./db";
import {
  validateGoogleReviewUrl,
  validateManagerWhatsApp,
  validateLanguage,
} from "./validators";

interface SeedRecord {
  id: string;
  name: string;
  branch_name: string;
  google_review_url: string;
  manager_whatsapp: string;
  language_preference: string;
  is_active: boolean;
}

const records: SeedRecord[] = [
  {
    id: "demo-001",
    name: "Voucho",
    branch_name: "Gulberg Branch",
    google_review_url:
      "https://www.google.com/maps/place/daily+pulse+cafe/",
    manager_whatsapp: "923001234567",
    language_preference: "roman_urdu",
    is_active: true,
  },
  {
    id: "demo-002",
    name: "Voucho",
    branch_name: "DHA Phase 6 Outlet",
    google_review_url:
      "https://www.google.com/maps/place/daily+pulse+dha/",
    manager_whatsapp: "923009876543",
    language_preference: "urdu",
    is_active: true,
  },
  {
    id: "demo-003",
    name: "Voucho",
    branch_name: "Bahria Town Kiosk",
    google_review_url:
      "https://maps.google.com/maps?q=daily+pulse+bahria",
    manager_whatsapp: "923331112233",
    language_preference: "english",
    is_active: false, // kill-switch demo
  },
];

async function seed() {
  console.log("🌱  Starting database seed...\n");

  for (const record of records) {
    // --- Server-side validation before any DB interaction ---
    if (!validateGoogleReviewUrl(record.google_review_url)) {
      throw new Error(
        `[SEED] Invalid google_review_url for ${record.id}: "${record.google_review_url}"`
      );
    }
    if (!validateManagerWhatsApp(record.manager_whatsapp)) {
      throw new Error(
        `[SEED] Invalid manager_whatsapp for ${record.id}: "${record.manager_whatsapp}"`
      );
    }
    if (!validateLanguage(record.language_preference)) {
      throw new Error(
        `[SEED] Invalid language_preference for ${record.id}: "${record.language_preference}"`
      );
    }

    // Parameterized upsert — no string interpolation
    await db.query(
      `INSERT INTO businesses
         (id, name, branch_name, google_review_url, manager_whatsapp, language_preference, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO UPDATE SET
         name                = EXCLUDED.name,
         branch_name         = EXCLUDED.branch_name,
         google_review_url   = EXCLUDED.google_review_url,
         manager_whatsapp    = EXCLUDED.manager_whatsapp,
         language_preference = EXCLUDED.language_preference,
         is_active           = EXCLUDED.is_active`,
      [
        record.id,
        record.name,
        record.branch_name,
        record.google_review_url,
        record.manager_whatsapp,
        record.language_preference,
        record.is_active,
      ]
    );
    console.log(
      `  ✔  Upserted [${record.id}] — "${record.name}" / ${record.branch_name}`
    );
  }

  console.log("\n✅  Seed complete.");
  await db.end();
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});
