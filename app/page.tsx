/**
 * app/page.tsx
 *
 * Voucho — landing page.
 * Sections: Hero · Audience Sectors · Feature Grid · How It Works · Pricing · FAQ · Footer CTA
 *
 * Design: Light-first, editorial, trustworthy, premium.
 * Off-white canvas, white cards, subtle borders, editorial serif headings.
 * Strictly compliant with the theme design specs.
 */

import Link from "next/link";
import MarketingShell from "@/components/MarketingShell";
import VouchoLogo from "@/components/VouchoLogo";

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */

const sectors = [
  {
    name: "Salons",
    description: "Compound five-star reviews directly at checkout. Capture negative experiences privately before clients leave.",
  },
  {
    name: "Clinics",
    description: "Provide patients with a trustworthy feedback loop, ensuring absolute privacy and clinical quality assurance.",
  },
  {
    name: "Restaurants",
    description: "Gather dining feedback at the table in real-time. Turn great meals into public Google ratings instantly.",
  },
  {
    name: "Gyms",
    description: "Monitor member satisfaction across facilities and equipment. Resolve complaints instantly on WhatsApp.",
  },
];

const features = [
  {
    title: "Automated Feedback",
    body: "Intelligent feedback routing that instantly separates happy recommendations from constructive complaints.",
  },
  {
    title: "Review Generation",
    body: "Compounds authentic 5-star Google Reviews on autopilot by making the checkout rating path frictionless.",
  },
  {
    title: "Reputation Monitoring",
    body: "Live analytics control panel to track check-in scans, redirection rates, and private recovery actions.",
  },
];

const steps = [
  {
    step: "1. Invite",
    body: "Deploy custom QR codes or NFC touchpoints at your reception desk, table, or retail counter.",
  },
  {
    step: "2. Capture",
    body: "Customers rate their visit. Voucho dynamically routes them to Google Reviews or a private WhatsApp channel.",
  },
  {
    step: "3. Monitor",
    body: "Track check-in volume, monitor branch health, and watch customer satisfaction compound.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Essential tools for single-location operators.",
    cta: "Get Started",
    ctaHref: "/register",
    highlighted: false,
    features: [
      "1 branch / location",
      "QR code standee generation",
      "Frictionless Google routing",
      "WhatsApp feedback routing",
    ],
  },
  {
    name: "Growth",
    price: "— / mo",
    period: "per location",
    description: "Ideal for growing premium service businesses.",
    cta: "Get Started",
    ctaHref: "/register",
    highlighted: true,
    features: [
      "Up to 5 branches",
      "Everything in Starter",
      "Priority WhatsApp alerts",
      "Weekly analytics digests",
    ],
  },
  {
    name: "Pro",
    price: "— / mo",
    period: "per location",
    description: "Enterprise features for multi-branch brands.",
    cta: "Book a Demo",
    ctaHref: "mailto:mail.arhamkhan1@gmail.com?subject=Voucho Pro Request",
    highlighted: false,
    features: [
      "Unlimited branches",
      "Everything in Growth",
      "SLA & uptime guarantees",
      "Dedicated account manager",
    ],
  },
];

const faqs = [
  {
    q: "How does the redirection mechanism work?",
    a: "Voucho displays a simple rating panel. High ratings are prompted to share their positive review on Google, while lower scores open a direct, private WhatsApp line with your branch manager.",
  },
  {
    q: "Does it require custom app installation?",
    a: "No. The entire flow runs seamlessly in the standard mobile web browser. There is absolutely no friction for your customers.",
  },
  {
    q: "Can I manage separate location dashboards?",
    a: "Yes. Each branch or shop gets its own distinct QR code, feedback parameters, and analytical reporting, all administered from your central dashboard.",
  },
  {
    q: "How fast can I launch?",
    a: "In less than two minutes. Create an account, input your Google Profile link and WhatsApp number, print your QR standee, and you are live.",
  },
];

/* ═══════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════ */

/** Flat card matching theme: white surface, EAEAE7 border, custom shadows */
function ThemeCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[#EAEAE7] bg-[#FFFFFF] p-7 transition-all duration-200 hover:border-[#DCDCD8]`}
      style={{ boxShadow: "0 20px 40px rgba(26,32,44,0.03)" }}
    >
      {children}
    </div>
  );
}

/** Section heading block with Playfair Display Editorial Serif */
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
      <p className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-teal-800 dark:text-teal-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-serif text-[#1A202C] dark:text-white sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MOCKUP PANEL (Hero Right Component)
   Renders:
   1. Google Review Growth Line Chart
   2. Reputation Score 94/100
   3. Generic 5-Star Feedback Feed
═══════════════════════════════════════════════════ */

function HeroMockup() {
  const reviews = [
    { name: "Sarah K.", rating: 5, comment: "Exceptional customer care at the salon. Will definitely be returning!" },
    { name: "Imran A.", rating: 5, comment: "Exquisite food. The feedback QR scan made it so easy to review." },
    { name: "David L.", rating: 5, comment: "Outstanding service. The team resolved my billing question instantly." },
  ];

  return (
    <div
      className="animate-fade-up delay-200 overflow-hidden rounded-2xl border border-[#EAEAE7] bg-[#FFFFFF] p-6 dark:border-slate-800 dark:bg-slate-900"
      style={{ boxShadow: "0 20px 40px rgba(26,32,44,0.03)" }}
    >
      <div className="grid gap-6 md:grid-cols-5">
        {/* Left column: Score & Line Chart */}
        <div className="md:col-span-2 flex flex-col justify-between gap-5">
          {/* Reputation Score Card */}
          <div className="rounded-xl border border-[#EAEAE7] bg-[#FBFBFA] p-4 text-center dark:border-slate-800 dark:bg-slate-800/40">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Reputation Score</p>
            <p className="mt-2 text-4xl font-serif font-bold text-[#1A202C] dark:text-white">94/100</p>
            <p className="mt-1 text-[11px] text-teal-700 font-medium dark:text-teal-400">"Excellent" Quality Index</p>
          </div>

          {/* Growth Chart Card */}
          <div className="rounded-xl border border-[#EAEAE7] bg-[#FBFBFA] p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Google Review Growth</p>
            <div className="h-20 w-full flex items-end">
              <svg viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <path d="M 0 100 Q 50 90 100 70 T 200 40 T 300 10" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />
                <path d="M 0 100 Q 50 90 100 70 T 200 40 T 300 10 L 300 120 L 0 120 Z" fill="url(#hero-chart-grad)" opacity="0.08" />
                <defs>
                  <linearGradient id="hero-chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#0f766e"/>
                    <stop offset="100%" stop-color="#0f766e" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <circle cx="100" cy="70" r="4.5" fill="#0f766e" />
                <circle cx="200" cy="40" r="4.5" fill="#0f766e" />
                <circle cx="300" cy="10" r="4.5" fill="#0f766e" />
              </svg>
            </div>
            <div className="flex justify-between text-[9px] font-semibold text-slate-400 mt-2 uppercase tracking-wider">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
            </div>
          </div>
        </div>

        {/* Right column: 5-Star Feedback Feed */}
        <div className="md:col-span-3 flex flex-col justify-between">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Recent 5-Star Feedback Feed</p>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#EAEAE7] bg-[#FBFBFA] p-3 text-xs dark:border-slate-800 dark:bg-slate-800/40"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-[#1A202C] dark:text-white">{r.name}</span>
                  <span className="text-teal-600 text-[10px] font-bold tracking-wider">★★★★★</span>
                </div>
                <p className="text-slate-550 dark:text-slate-400 italic">"{r.comment}"</p>
              </div>
            ))}
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
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Hero Details */}
          <div className="animate-fade-up text-left">
            <p className="mb-4 inline-block rounded-full border border-teal-200 bg-teal-50/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-850 dark:border-teal-900/30 dark:bg-teal-950/20 dark:text-teal-400">
              Reputation & Trust Infrastructure
            </p>
            <h1 className="text-4xl font-serif leading-[1.12] tracking-tight text-[#1A202C] dark:text-white sm:text-5xl lg:text-6xl">
              The Trust Infrastructure for Exceptional Service Businesses.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg">
              Automate feedback, compound Google Reviews, and monitor your reputation effortlessly.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                id="hero-book-demo-cta"
                href="mailto:mail.arhamkhan1@gmail.com?subject=Voucho Demo Request"
                className="w-full rounded-lg bg-teal-800 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-xs transition hover:bg-teal-700 active:scale-[0.98] sm:w-auto"
              >
                Book a Demo
              </Link>
              <Link
                id="hero-secondary-register"
                href="/register"
                className="w-full rounded-lg border border-[#EAEAE7] bg-[#FFFFFF] px-6 py-3.5 text-center text-sm font-semibold text-slate-600 shadow-xs transition hover:bg-slate-55 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 sm:w-auto"
              >
                Create Free Account
              </Link>
            </div>
          </div>

          {/* Right Hero Mockups */}
          <HeroMockup />
        </div>
      </section>

      {/* ── AUDIENCE SECTORS ──────────────────────── */}
      <section id="audience-sectors" className="border-t border-[#EAEAE7] bg-[#FFFFFF] py-20 dark:border-slate-800 dark:bg-slate-900/20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="Audience Sectors"
            title="Designed for Premium Service Providers"
            subtitle="Tailored to fit high-trust environments that rely heavily on digital reputation."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector) => (
              <div
                key={sector.name}
                className="rounded-xl border border-[#EAEAE7] bg-[#FBFBFA] p-6 transition-all duration-200 dark:border-slate-800 dark:bg-slate-900/50"
              >
                <h3 className="text-xl font-serif text-[#1A202C] dark:text-white mb-2">{sector.name}</h3>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-450">{sector.description}</p>
              </div>
            ))}
          </div>
          {/* Compliance Rule check */}
          <div className="mt-8 text-center text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Strictly zero company logos or partner names.
          </div>
        </div>
      </section>

      {/* ── FEATURE GRID (3-column layout) ────────── */}
      <section id="features" className="border-t border-[#EAEAE7] py-24 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="Features"
            title="Protect & amplify your online reputation"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <ThemeCard
                key={f.title}
                className={`animate-fade-up delay-${i * 100}`}
              >
                <div className="h-1.5 w-8 rounded-full bg-teal-700 mb-5 dark:bg-teal-500" />
                <h3 className="text-lg font-serif text-[#1A202C] dark:text-white mb-3">{f.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{f.body}</p>
              </ThemeCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────── */}
      <section id="how-it-works" className="border-t border-[#EAEAE7] bg-[#FFFFFF] py-24 dark:border-slate-800 dark:bg-slate-900/20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="Process Flow"
            title="Simple, structured integration"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.step} className={`animate-fade-up delay-${i * 150}`}>
                <ThemeCard className="h-full">
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">{s.step}</p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{s.body}</p>
                </ThemeCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING (Navbar integration) ──────────── */}
      <section id="pricing" className="border-t border-[#EAEAE7] py-24 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="Pricing Plan"
            title="Simple, transparent plans"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <div key={tier.name} className={`animate-fade-up delay-${i * 100}`}>
                <ThemeCard
                  className={`flex h-full flex-col p-7 transition-colors duration-200 ${
                    tier.highlighted
                      ? "border-teal-700 bg-white ring-1 ring-teal-700/10 dark:border-teal-500/40"
                      : ""
                  }`}
                >
                  {tier.highlighted && (
                    <p className="mb-4 inline-block self-start rounded-full bg-teal-50 border border-teal-200 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-850 dark:bg-teal-950 dark:border-teal-900 dark:text-teal-400">
                      Most Popular
                    </p>
                  )}
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{tier.name}</p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[#1A202C] dark:text-white">{tier.price}</span>
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
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#1A202C] dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </ThemeCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (Minimalist Accordions) ────────────── */}
      <section id="faq" className="border-t border-[#EAEAE7] bg-[#FFFFFF] py-24 dark:border-slate-800 dark:bg-slate-900/20">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeader
            eyebrow="FAQ"
            title="Common Questions"
          />
          <div className="space-y-3 animate-fade-up delay-100">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[#EAEAE7] bg-[#FFFFFF] px-6 py-5 transition-colors duration-150 hover:border-[#DCDCD8] dark:border-slate-800 dark:bg-slate-900/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#1A202C] dark:text-white">
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
                <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ────────────────────────────── */}
      <section className="border-t border-[#EAEAE7] py-24 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 text-center animate-fade-up">
          <h2 className="text-3xl font-serif text-[#1A202C] dark:text-white sm:text-4xl uppercase tracking-tight">
            Ready to Build Lasting Trust?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-500 dark:text-slate-400">
            Set up your branch, capture direct customer ratings, and safeguard your online standing effortlessly.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              id="footer-cta-book-demo"
              href="mailto:mail.arhamkhan1@gmail.com?subject=Voucho Demo Request"
              className="w-full rounded-lg bg-teal-800 px-8 py-4 text-center text-[15px] font-semibold text-white shadow-sm transition hover:bg-teal-700 active:scale-[0.98] sm:w-auto"
            >
              Book a Demo
            </Link>
            <Link
              id="footer-cta-register"
              href="/register"
              className="w-full rounded-lg border border-[#EAEAE7] bg-[#FFFFFF] px-8 py-4 text-center text-[15px] font-semibold text-slate-600 shadow-xs transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 sm:w-auto"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────── */}
      <footer className="border-t border-[#EAEAE7] py-12 bg-[#FFFFFF] dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Link href="/" className="text-[#1A202C] dark:text-white">
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
                Privacy Policy
              </Link>
              <span aria-hidden className="text-slate-200 dark:text-slate-800">·</span>
              <Link
                href="/terms-of-service"
                className="text-xs text-slate-400 hover:text-slate-600 transition underline underline-offset-2 dark:text-slate-500 dark:hover:text-slate-350"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Voucho. All rights reserved.
          </p>
        </div>
      </footer>
    </MarketingShell>
  );
}
