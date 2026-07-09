/**
 * scripts/weekly-report.ts
 * Automated Weekly Performance Reporter.
 *
 * Calculates metrics over a trailing 7-day window and emits the exact
 * text block format specified in the technical requirements.
 *
 * Run:
 *   npx ts-node --project tsconfig.scripts.json scripts/weekly-report.ts
 *   -- or for all businesses --
 *   npx ts-node --project tsconfig.scripts.json scripts/weekly-report.ts --all
 *   -- or for a specific business --
 *   npx ts-node --project tsconfig.scripts.json scripts/weekly-report.ts --id demo-001
 */
import { Pool } from "pg";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

interface Business {
  id: string;
  name: string;
  branch_name: string;
  is_active: boolean;
}

interface MetricsRow {
  action_type: string;
  count: string;
}

function fmt(n: number, total: number): string {
  if (total === 0) return "0.00";
  return ((n / total) * 100).toFixed(2);
}

async function generateReport(
  pool: Pool,
  business: Business
): Promise<string> {
  const result = await pool.query<MetricsRow>(
    `SELECT action_type, COUNT(*) AS count
     FROM scan_logs
     WHERE business_id = $1
       AND scanned_at >= NOW() - INTERVAL '7 days'
     GROUP BY action_type`,
    [business.id]
  );

  const counts: Record<string, number> = {
    page_view: 0,
    review_click: 0,
    manager_click: 0,
  };

  for (const row of result.rows) {
    counts[row.action_type] = parseInt(row.count, 10);
  }

  const pageViews    = counts.page_view;
  const reviewClicks = counts.review_click;
  const managerClicks= counts.manager_click;
  const totalEngaged = reviewClicks + managerClicks;

  const reviewPct  = fmt(reviewClicks,  pageViews);
  const managerPct = fmt(managerClicks, pageViews);
  const engagePct  = fmt(totalEngaged,  pageViews);

  const status = business.is_active ? "Active & monitoring." : "Inactive (kill-switch enabled).";

  return [
    `Daily Pulse Weekly Update for ${business.name} (${business.branch_name}):`,
    `- QR Code Scans (Total Page Views): ${pageViews}`,
    `- Google Business Profile Visits: ${reviewClicks} (${reviewPct}%)`,
    `- Direct Management Line Conversations: ${managerClicks} (${managerPct}%)`,
    `- Overall Engagement Rate: ${engagePct}%`,
    ``,
    `Status: ${status}`,
  ].join("\n");
}

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 3,
  });

  const args = process.argv.slice(2);
  const idFlag = args.indexOf("--id");
  const allFlag = args.includes("--all");

  let businesses: Business[];

  if (idFlag !== -1 && args[idFlag + 1]) {
    const targetId = args[idFlag + 1];
    const res = await pool.query<Business>(
      `SELECT id, name, branch_name, is_active FROM businesses WHERE id = $1`,
      [targetId]
    );
    if (res.rows.length === 0) {
      console.error(`❌  No business found with id: ${targetId}`);
      await pool.end();
      process.exit(1);
    }
    businesses = res.rows;
  } else if (allFlag) {
    const res = await pool.query<Business>(
      `SELECT id, name, branch_name, is_active FROM businesses ORDER BY name, branch_name`
    );
    businesses = res.rows;
  } else {
    // Default: all active businesses
    const res = await pool.query<Business>(
      `SELECT id, name, branch_name, is_active FROM businesses WHERE is_active = TRUE ORDER BY name, branch_name`
    );
    businesses = res.rows;
  }

  const separator = "─".repeat(58);
  console.log(`\n${"═".repeat(58)}`);
  console.log(`  THE DAILY PULSE · Weekly Performance Report`);
  console.log(`  Generated: ${new Date().toISOString()}`);
  console.log(`${"═".repeat(58)}\n`);

  for (const biz of businesses) {
    const report = await generateReport(pool, biz);
    console.log(report);
    console.log(separator);
  }

  await pool.end();
}

main().catch((err) => {
  console.error("❌  Report generation failed:", err.message);
  process.exit(1);
});
