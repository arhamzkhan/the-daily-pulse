# Voucho — Business Reputation Platform

A **production-ready**, full-stack Next.js 16 application that routes QR-code scans to either Google Business Profile reviews or direct WhatsApp management conversations — with dynamic localization (English, Roman Urdu, Urdu), secure event tracking, and automated weekly performance reporting.

---

## Architecture

```
the-daily-pulse/
├── app/
│   ├── api/log/route.ts          # POST /api/log  — beacon tracking endpoint
│   ├── review/[businessId]/
│   │   ├── page.tsx              # Server component (fetch + page_view log)
│   │   └── ReviewClient.tsx      # Client component (sendBeacon + localized UI)
│   ├── layout.tsx
│   ├── page.tsx                  # Redirects → /review/demo-001
│   ├── not-found.tsx
│   └── globals.css
├── lib/
│   ├── db.ts                     # PostgreSQL pool singleton
│   ├── localization.ts           # Static locale dictionary
│   ├── rateLimit.ts              # 5-second CGNAT dedup window
│   ├── schema.sql                # DDL with indexes
│   ├── seed.ts                   # Validated seed data
│   └── validators.ts             # URL, WhatsApp, language validators
├── scripts/
│   └── weekly-report.ts          # Trailing 7-day metrics reporter
├── .env.local.example
├── tsconfig.scripts.json
└── package.json
```

## Quick Start

### 1. Database Setup
```bash
# Create the database and run the schema
psql -U postgres -c "CREATE DATABASE daily_pulse;"
psql -U postgres -d daily_pulse -f lib/schema.sql
```

### 2. Environment
```bash
cp .env.local.example .env.local
# Edit .env.local and set your DATABASE_URL
```

### 3. Install & Seed
```bash
npm install
npm run db:seed
```

### 4. Run
```bash
npm run dev
# Visit http://localhost:3000/review/demo-001
```

## Weekly Report
```bash
npm run report           # All active businesses
npm run report:all       # All businesses including inactive
npm run report -- --id demo-001   # Specific business
```

## Security Features

| Feature | Implementation |
|---------|---------------|
| SQL Injection | Parameterized queries (`$1`, `$2`, ...) everywhere |
| XSS | All strings bound via JSX (React textContent) — no `dangerouslySetInnerHTML` |
| Open Redirect | Google URL allow-list regex on seed/insert |
| CGNAT Dedup | 5-second in-memory window keyed on `businessId + actionType + User-Agent` |
| Kill Switch | `is_active=FALSE` hides manager button, keeps Google path active |
| Anti-data-loss | `navigator.sendBeacon` fires before `window.location.href` redirect |
| Security Headers | X-Frame-Options, X-XSS-Protection, CSP, Referrer-Policy via `next.config.ts` |

## Localization Matrix

| Language | Direction | Tagline |
|----------|-----------|---------|
| `english` | LTR | "We value your presence..." |
| `roman_urdu` | LTR | "Hamaray paas aanay ka shukriya..." |
| `urdu` | RTL | "ہمارے پاس آنے کا شکریہ..." |

## Database Schema

```sql
businesses (id, name, branch_name, google_review_url, manager_whatsapp,
            language_preference, is_active, created_at)

scan_logs  (id, business_id → businesses.id, action_type, scanned_at)
           -- action_type ∈ {'page_view', 'review_click', 'manager_click'}
```
