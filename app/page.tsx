/**
 * app/page.tsx
 *
 * Voucho — landing page.
 * Sections: Hero · Features · How It Works · Dashboard Preview · Pricing · FAQ · Footer
 *
 * Design: dark, premium, flat surfaces with subtle borders.
 * Animations: fade-up on entry, hover effects only. No blobs or heavy gradients.
 */

import Link from "next/link";
import MarketingShell from "@/components/MarketingShell";
import VouchoLogo from "@/components/VouchoLogo";

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Features",     href: "/#features"     },
  { label: "How it Works", href: "/#how-it-works"  },
  { label: "Pricing",      href: "/#pricing"       },
  { label: "FAQ",          href: "/#faq"           },
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

/** Simple flat card with a subtle border */
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/8 bg-[#18181b] ${className}`}
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
    <div className="mb-12 text-center animate-fade-up">
      <p className="mb-3 inline-block rounded-full border border-[#0f766e]/30 bg-[#0f766e]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#14b8a6]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base text-white/50 max-w-xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   DASHBOARD PREVIEW
   Shows the actual product flow: scan → route → dashboard update
═══════════════════════════════════════════════════ */

function DashboardPreview() {
  const scans = [
    { label: "Salon Gulberg",   scans: 847,  google: 631,  private: 216, rating: 4.8 },
    { label: "Salon DHA",       scans: 512,  google: 398,  private: 114, rating: 4.6 },
    { label: "Salon Johar Town",scans: 293,  google: 201,  private:  92, rating: 4.5 },
  ];

  const recentFeedback = [
    { type: "google",  time: "2 min ago",  branch: "Gulberg", snippet: "Redirected to Google →" },
    { type: "private", time: "11 min ago", branch: "DHA",     snippet: "Private: 'The wait was too long…'" },
    { type: "google",  time: "18 min ago", branch: "Gulberg", snippet: "Redirected to Google →" },
    { type: "google",  time: "34 min ago", branch: "Johar",   snippet: "Redirected to Google →" },
    { type: "private", time: "1 hr ago",   branch: "DHA",     snippet: "Private: 'Staff was rude…'" },
  ];

  return (
    <div className="animate-fade-up delay-200 overflow-hidden rounded-2xl border border-white/8 bg-[#111113]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/8 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="h-3 w-3 rounded-full bg-white/10" />
        <span className="ml-3 text-xs font-medium text-white/30">Voucho Dashboard — Overview</span>
      </div>

      <div className="p-5 sm:p-6">
        {/* Stat row */}
        <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Total Scans",     value: "1,652", delta: "+12% this week" },
            { label: "Google Redirects",value: "1,230", delta: "74% conversion"  },
            { label: "Recovered",       value:   "422", delta: "saved from going public" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/6 bg-[#18181b] p-3 sm:p-4">
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">{stat.label}</p>
              <p className="mt-1 text-xl font-bold text-white sm:text-2xl">{stat.value}</p>
              <p className="mt-0.5 text-[10px] text-[#14b8a6]">{stat.delta}</p>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Branch performance */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/35">
              Branch Performance
            </p>
            <div className="space-y-2">
              {scans.map((b) => (
                <div
                  key={b.label}
                  className="flex items-center justify-between rounded-xl border border-white/6 bg-[#18181b] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{b.label}</p>
                    <p className="mt-0.5 text-xs text-white/40">{b.scans} scans</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#14b8a6]">
                      <span className="font-semibold">{b.google}</span> Google
                    </p>
                    <p className="text-xs text-white/40">
                      <span className="font-semibold">{b.private}</span> private
                    </p>
                  </div>
                  <div className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#0f766e]/15 text-xs font-bold text-[#14b8a6]">
                    {b.rating}★
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live feedback feed */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/35">
              Live Feedback Feed
            </p>
            <div className="space-y-2">
              {recentFeedback.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/6 bg-[#18181b] px-4 py-3"
                >
                  <span
                    className={`mt-0.5 h-2 w-2 flex-none rounded-full ${
                      f.type === "google" ? "bg-[#14b8a6]" : "bg-amber-400"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-white/75">{f.snippet}</p>
                    <p className="mt-0.5 text-[10px] text-white/35">
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
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <p className="mb-5 inline-block rounded-full border border-[#0f766e]/30 bg-[#0f766e]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#14b8a6]">
            Business Reputation Platform
          </p>
          <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Turn customer feedback<br />
            <span className="text-white/40">into business growth.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            Collect Google reviews, recover unhappy customers privately, and manage your reputation
            from one dashboard — with a single QR code at your counter.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              id="hero-get-started"
              href="/register"
              className="w-full rounded-xl bg-[#0f766e] px-8 py-4 text-center text-[15px] font-semibold text-white shadow-lg shadow-[#0f766e]/20 transition hover:bg-[#0d9488] active:scale-[0.98] sm:w-auto"
            >
              Get Started — it&apos;s free
            </Link>
            <Link
              id="hero-book-demo"
              href="mailto:mail.arhamkhan1@gmail.com?subject=Voucho Demo Request"
              className="w-full rounded-xl border border-white/12 bg-white/5 px-8 py-4 text-center text-[15px] font-medium text-white/70 transition hover:bg-white/8 hover:text-white sm:w-auto"
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
      <section id="features" className="border-t border-white/8 py-24">
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
                className={`group p-6 transition-colors duration-200 hover:border-white/14 hover:bg-[#1f1f23] animate-fade-up delay-${(i % 3) * 100}`}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-[#0f766e]/10 text-[#14b8a6]">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{f.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────── */}
      <section id="how-it-works" className="border-t border-white/8 py-24">
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
                  <p className="text-xs font-bold tracking-[0.2em] text-[#0f766e]">{s.step}</p>
                  <h3 className="mt-4 text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{s.body}</p>
                </Card>
              </div>
            ))}
          </div>

          {/* Flow diagram */}
          <div className="mt-10 flex flex-col items-center justify-center gap-2 text-xs text-white/35 sm:flex-row sm:gap-4">
            {["Customer scans QR", "Rates experience", "Happy → Google review", "Unhappy → Private WhatsApp"].map(
              (label, i, arr) => (
                <span key={label} className="flex items-center gap-2 sm:gap-4">
                  <span className="rounded-full border border-white/8 bg-[#18181b] px-3 py-1.5 text-white/50">
                    {label}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="hidden text-white/20 sm:inline">→</span>
                  )}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────── */}
      <section id="pricing" className="border-t border-white/8 py-24">
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
                      ? "border-[#0f766e]/50 bg-[#0f766e]/6 hover:border-[#0f766e]/70"
                      : "hover:border-white/14 hover:bg-[#1f1f23]"
                  }`}
                >
                  {tier.highlighted && (
                    <p className="mb-4 inline-block self-start rounded-full bg-[#0f766e] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Most Popular
                    </p>
                  )}
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{tier.name}</p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    {tier.period && (
                      <span className="text-sm text-white/40">/ {tier.period}</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-white/50">{tier.description}</p>
                  <ul className="my-7 flex-1 space-y-3 border-t border-white/8 pt-6 text-sm">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-white/65">
                        <svg className="mt-0.5 h-4 w-4 flex-none text-[#14b8a6]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
                        ? "bg-[#0f766e] text-white shadow-lg shadow-[#0f766e]/20 hover:bg-[#0d9488]"
                        : "border border-white/10 text-white/75 hover:bg-white/5 hover:text-white"
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
      <section id="faq" className="border-t border-white/8 py-24">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions"
          />
          <div className="space-y-3 animate-fade-up delay-100">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/8 bg-[#18181b] px-6 py-5 transition-colors duration-150 hover:border-white/14"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white">
                  {item.q}
                  <svg
                    className="h-4 w-4 flex-none text-white/40 transition-transform duration-200 group-open:rotate-45"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-white/50">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────── */}
      <section className="border-t border-white/8 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center animate-fade-up">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to put a QR on your counter?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
            Set up your branch, download your print-ready QR standee, and start collecting reviews
            in under 5 minutes.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              id="cta-banner-get-started"
              href="/register"
              className="w-full rounded-xl bg-[#0f766e] px-8 py-4 text-center text-[15px] font-semibold text-white shadow-lg shadow-[#0f766e]/20 transition hover:bg-[#0d9488] active:scale-[0.98] sm:w-auto"
            >
              Get Started — it&apos;s free
            </Link>
            <Link
              id="cta-banner-book-demo"
              href="mailto:mail.arhamkhan1@gmail.com?subject=Voucho Demo Request"
              className="w-full rounded-xl border border-white/12 bg-white/5 px-8 py-4 text-center text-[15px] font-medium text-white/70 transition hover:bg-white/8 hover:text-white sm:w-auto"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────── */}
      <footer className="border-t border-white/8 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Link href="/" className="text-white">
              <VouchoLogo size="sm" />
            </Link>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/40 transition hover:text-white/70"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy-policy"
                className="text-xs text-white/35 transition hover:text-white/60 underline underline-offset-2"
              >
                Privacy
              </Link>
              <span aria-hidden className="text-white/20">·</span>
              <Link
                href="/terms-of-service"
                className="text-xs text-white/35 transition hover:text-white/60 underline underline-offset-2"
              >
                Terms
              </Link>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-white/25">
            © {new Date().getFullYear()} Voucho. Business Reputation Platform.
          </p>
        </div>
      </footer>
    </MarketingShell>
  );
}



