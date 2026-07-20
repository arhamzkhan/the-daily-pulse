/**
 * app/page.tsx
 *
 * Voucho — landing page.
 * Sections: Hero · Features · How It Works · Dashboard Preview · Pricing · FAQ · Footer
 *
 * Design: Light-first, trustworthy, approachable, premium SaaS.
 * Plenty of whitespace, flat surfaces, clean borders and elevation.
 * Subtle teal/slate accents. Minimal animations.
 */

import Link from "next/link";
import MarketingShell from "@/components/MarketingShell";
import VouchoLogo from "@/components/VouchoLogo";

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Features",     href: "#features"     },
  { label: "How it Works", href: "#how-it-works"  },
  { label: "Pricing",      href: "#pricing"       },
  { label: "FAQ",          href: "#faq"           },
];

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Google Review Collection",
    body: "Route happy customers directly to your Google listing — one tap, zero friction.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Reputation Recovery",
    body: "Unhappy guests reach your manager privately on WhatsApp before posting publicly.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.75" />
        <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
    title: "QR & NFC Campaigns",
    body: "Print a branded standee in seconds. Place it at checkout, tables, or the reception desk.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Multi-Branch Management",
    body: "Each location gets its own link and analytics. Manage every branch from one panel.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Real-Time Alerts",
    body: "Instant WhatsApp notifications when a customer leaves private feedback.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Scan & Traffic Analytics",
    body: "See exactly how many customers scanned, redirected, or sent private feedback.",
  },
];

const steps = [
  {
    step: "01",
    title: "Register your branch",
    body: "Add your business name, Google profile URL, and manager WhatsApp. Takes under 2 minutes.",
  },
  {
    step: "02",
    title: "Deploy your QR code",
    body: "Download a print-ready QR standee and place it at checkout, the table, or your counter.",
  },
  {
    step: "03",
    title: "Watch your reputation grow",
    body: "Happy customers tap through to Google. Unhappy ones go to your manager — not the internet.",
  },
];

// Placeholder pricing — edit tiers, prices, and features freely
const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for a single-location business just getting started.",
    cta: "Get Started",
    ctaHref: "/register",
    highlighted: false,
    features: [
      "1 branch / location",
      "QR & NFC standee generation",
      "Google review routing",
      "WhatsApp private feedback",
      "Basic scan analytics",
    ],
  },
  {
    name: "Growth",
    price: "— / mo",          // replace with real price
    period: "per location",
    description: "For businesses ready to take reputation management seriously.",
    cta: "Get Started",
    ctaHref: "/register",
    highlighted: true,
    features: [
      "Up to 5 branches",
      "Everything in Starter",
      "Priority WhatsApp alerts",
      "Custom branded standee",
      "Weekly performance digest",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "— / mo",          // replace with real price
    period: "per location",
    description: "Multi-branch chains and franchises that need full control.",
    cta: "Contact Us",
    ctaHref: "mailto:mail.arhamkhan1@gmail.com",
    highlighted: false,
    features: [
      "Unlimited branches",
      "Everything in Growth",
      "Dedicated account manager",
      "Custom integrations",
      "SLA & uptime guarantees",
      "Priority support",
    ],
  },
];

const faqs = [
  {
    q: "How does Voucho prevent bad reviews from going public?",
    a: "When a customer rates their experience poorly, Voucho routes them to a private WhatsApp message to your branch manager instead of sending them to Google. Happy customers go straight to your Google listing to leave a public review.",
  },
  {
    q: "Does the customer need to download an app?",
    a: "No. The entire flow works in the customer's mobile browser — they scan the QR code, tap a rating, and are routed instantly. Zero app downloads, zero friction.",
  },
  {
    q: "Can I manage multiple branches from one account?",
    a: "Yes. Each branch gets its own unique QR code, public link, and analytics. You manage all locations from a single dashboard.",
  },
  {
    q: "How long does setup take?",
    a: "Under 5 minutes. Register, enter your Google review link and WhatsApp number, download the QR standee, and you're live.",
  },
  {
    q: "Is my customer data kept private?",
    a: "Absolutely. We don't collect customer names or contact details during the review flow. Private feedback goes directly to your WhatsApp — we don't store the message content.",
  },
];

/* ═══════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════ */

/** Simple flat card with a subtle border and light shadow */
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:shadow-sm transition-all duration-200 dark:border-slate-800 dark:bg-slate-800/50 ${className}`}
    >
      {children}
    </div>
  );
}

/** Section heading block */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-14 text-center animate-fade-up">
      <p className="mb-3 inline-block rounded-full border border-teal-200 bg-teal-50/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-800 dark:border-teal-900/30 dark:bg-teal-950/20 dark:text-teal-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DASHBOARD PREVIEW
   Clean light-first style reflecting actual product flow
═══════════════════════════════════════════════════ */

function DashboardPreview() {
  const branches = [
    { label: "Gulberg Salon",   scans: 847,  google: 631,  private: 216, rating: 4.8 },
    { label: "DHA Clinic",      scans: 512,  google: 398,  private: 114, rating: 4.6 },
    { label: "Johar Town Gym",  scans: 293,  google: 201,  private:  92, rating: 4.5 },
  ];

  const recentFeedback = [
    { type: "google",  time: "2 min ago",  branch: "Gulberg Salon", snippet: "Redirected Happy Customer to Google Review Page" },
    { type: "private", time: "11 min ago", branch: "DHA Clinic",     snippet: "Negative experience recovered privately via WhatsApp: 'Long wait times...'" },
    { type: "google",  time: "18 min ago", branch: "Gulberg Salon", snippet: "Redirected Happy Customer to Google Review Page" },
    { type: "google",  time: "34 min ago", branch: "Johar Town Gym",   snippet: "Redirected Happy Customer to Google Review Page" },
    { type: "private", time: "1 hr ago",   branch: "DHA Clinic",     snippet: "Negative experience recovered privately via WhatsApp: 'Unclean counter...'" },
  ];

  return (
    <div className="animate-fade-up delay-200 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100/50 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        <span className="ml-3 text-[11px] font-medium text-slate-400 dark:text-slate-500">Voucho Dashboard — Reputation Hub</span>
      </div>

      <div className="p-5 sm:p-6">
        {/* Stat row */}
        <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Total QR Scans",     value: "1,652", delta: "Across all branches" },
            { label: "Google Redirects",value: "1,230", delta: "Happy customers routed"  },
            { label: "Private Recoveries",value:   "422", delta: "Unhappy complaints saved" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs dark:border-slate-800 dark:bg-slate-800">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{stat.label}</p>
              <p className="mt-1 text-xl font-bold text-slate-950 dark:text-white sm:text-2xl">{stat.value}</p>
              <p className="mt-0.5 text-[10px] text-teal-600 dark:text-teal-400 font-medium">{stat.delta}</p>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Branch performance */}
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Active Locations
            </p>
            <div className="space-y-2">
              {branches.map((b) => (
                <div
                  key={b.label}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xs dark:border-slate-800 dark:bg-slate-800"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{b.label}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">{b.scans} scans</p>
                  </div>
                  <div className="text-right ml-2 flex-shrink-0">
                    <p className="text-[11px] text-teal-600 font-medium">
                      <span className="font-semibold">{b.google}</span> Google
                    </p>
                    <p className="text-[11px] text-slate-400">
                      <span className="font-semibold">{b.private}</span> Private
                    </p>
                  </div>
                  <div className="ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700 dark:bg-teal-950/40 dark:text-teal-400">
                    {b.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live routing activity */}
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Live Activity Flow
            </p>
            <div className="space-y-2">
              {recentFeedback.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xs dark:border-slate-800 dark:bg-slate-800"
                >
                  <span
                    className={`mt-1.5 h-2 w-2 flex-none rounded-full ${
                      f.type === "google" ? "bg-teal-500" : "bg-amber-500"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-350">{f.snippet}</p>
                    <p className="mt-0.5 text-[10px] text-slate-400 font-medium">
                      {f.branch} · {f.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════ */

export default function LandingPage() {
  return (
    <MarketingShell showNav maxWidth="full">
      {/* ── HERO ──────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-20 sm:pt-28 sm:pb-24">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <p className="mb-5 inline-block rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-800 dark:border-teal-900/30 dark:bg-teal-950/20 dark:text-teal-400">
            Business Reputation Platform
          </p>
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Turn customer feedback<br />
            <span className="text-slate-400">into business growth.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg">
            Collect Google reviews, recover unhappy customers privately, and manage your reputation
            from one dashboard — with a single QR code at your counter.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              id="hero-get-started"
              href="/register"
              className="w-full rounded-xl bg-teal-800 px-8 py-4 text-center text-[15px] font-semibold text-white shadow-sm transition hover:bg-teal-700 active:scale-[0.98] sm:w-auto"
            >
              Get Started — it&apos;s free
            </Link>
            <Link
              id="hero-book-demo"
              href="mailto:mail.arhamkhan1@gmail.com?subject=Voucho Demo Request"
              className="w-full rounded-xl border border-slate-200 bg-white px-8 py-4 text-center text-[15px] font-semibold text-slate-600 shadow-xs transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 sm:w-auto"
            >
              Book a Demo
            </Link>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="mt-16 sm:mt-20">
          <DashboardPreview />
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────── */}
      <section id="features" className="border-t border-slate-100 bg-slate-50/50 py-24 dark:border-slate-900 dark:bg-slate-900/10">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="Features"
            title="Everything you need to protect your reputation"
            subtitle="Built for salons, restaurants, clinics, gyms, and other service businesses."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Card
                key={f.title}
                className={`group p-6 animate-fade-up delay-${(i % 3) * 100}`}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-800 dark:bg-teal-950/30 dark:text-teal-400">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{f.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────── */}
      <section id="how-it-works" className="border-t border-slate-100 py-24 dark:border-slate-900">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="How it Works"
            title="Live in three steps"
            subtitle="No technical setup required. If you can print a page, you're good to go."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.step} className={`animate-fade-up delay-${i * 150}`}>
                <Card className="h-full p-7">
                  <p className="text-xs font-bold tracking-[0.2em] text-teal-700 dark:text-teal-400">{s.step}</p>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{s.body}</p>
                </Card>
              </div>
            ))}
          </div>

          {/* Flow diagram */}
          <div className="mt-12 flex flex-col items-center justify-center gap-2 text-xs text-slate-400 sm:flex-row sm:gap-4">
            {["Customer scans QR", "Rates experience", "Happy → Google review", "Unhappy → Private WhatsApp"].map(
              (label, i, arr) => (
                <span key={label} className="flex items-center gap-2 sm:gap-4">
                  <span className="rounded-full border border-slate-100 bg-slate-50 px-3.5 py-2 text-slate-500 font-medium dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                    {label}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="hidden text-slate-300 dark:text-slate-700 sm:inline">→</span>
                  )}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────── */}
      <section id="pricing" className="border-t border-slate-100 bg-slate-50/50 py-24 dark:border-slate-900 dark:bg-slate-900/10">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="Pricing"
            title="Simple, transparent pricing"
            subtitle="Start free. Upgrade when you're ready. No hidden fees."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <div key={tier.name} className={`animate-fade-up delay-${i * 100}`}>
                <Card
                  className={`flex h-full flex-col p-7 transition-colors duration-200 ${
                    tier.highlighted
                      ? "border-teal-700/60 bg-white ring-1 ring-teal-700/10 dark:border-teal-500/40"
                      : ""
                  }`}
                >
                  {tier.highlighted && (
                    <p className="mb-4 inline-block self-start rounded-full bg-teal-50 border border-teal-200 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:bg-teal-950 dark:border-teal-900 dark:text-teal-400">
                      Most Popular
                    </p>
                  )}
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{tier.name}</p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">{tier.price}</span>
                    {tier.period && (
                      <span className="text-sm text-slate-400">/ {tier.period}</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{tier.description}</p>
                  <ul className="my-7 flex-1 space-y-3 border-t border-slate-100 pt-6 text-sm dark:border-slate-800">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-450">
                        <svg className="mt-0.5 h-4 w-4 flex-none text-teal-600 dark:text-teal-400" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link
                    id={`pricing-cta-${tier.name.toLowerCase()}`}
                    href={tier.ctaHref}
                    className={`mt-auto block rounded-xl px-5 py-3 text-center text-sm font-semibold transition ${
                      tier.highlighted
                        ? "bg-teal-800 text-white shadow-sm hover:bg-teal-700"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-850"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section id="faq" className="border-t border-slate-100 py-24 dark:border-slate-900">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions"
          />
          <div className="space-y-3 animate-fade-up delay-100">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-slate-200 bg-white px-6 py-5 transition-colors duration-150 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-900 dark:text-white">
                  {item.q}
                  <svg
                    className="h-4 w-4 flex-none text-slate-400 transition-transform duration-200 group-open:rotate-45"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────── */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-24 dark:border-slate-900 dark:bg-slate-900/10">
        <div className="mx-auto max-w-3xl px-4 text-center animate-fade-up">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Ready to put a QR on your counter?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 dark:text-slate-400">
            Set up your branch, download your print-ready QR standee, and start collecting reviews
            in under 5 minutes.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              id="cta-banner-get-started"
              href="/register"
              className="w-full rounded-xl bg-teal-800 px-8 py-4 text-center text-[15px] font-semibold text-white shadow-sm transition hover:bg-teal-700 active:scale-[0.98] sm:w-auto"
            >
              Get Started — it&apos;s free
            </Link>
            <Link
              id="cta-banner-book-demo"
              href="mailto:mail.arhamkhan1@gmail.com?subject=Voucho Demo Request"
              className="w-full rounded-xl border border-slate-200 bg-white px-8 py-4 text-center text-[15px] font-semibold text-slate-600 shadow-xs transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 sm:w-auto"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────── */}
      <footer className="border-t border-slate-100 py-12 dark:border-slate-900">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Link href="/" className="text-slate-900 dark:text-white">
              <VouchoLogo size="sm" />
            </Link>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-slate-400 hover:text-slate-650 transition dark:text-slate-500 dark:hover:text-slate-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy-policy"
                className="text-xs text-slate-400 hover:text-slate-600 transition underline underline-offset-2 dark:text-slate-500 dark:hover:text-slate-350"
              >
                Privacy
              </Link>
              <span aria-hidden className="text-slate-200 dark:text-slate-800">·</span>
              <Link
                href="/terms-of-service"
                className="text-xs text-slate-400 hover:text-slate-600 transition underline underline-offset-2 dark:text-slate-500 dark:hover:text-slate-350"
              >
                Terms
              </Link>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Voucho. Business Reputation Platform.
          </p>
        </div>
      </footer>
    </MarketingShell>
  );
}
