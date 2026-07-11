import Link from "next/link";
import MarketingShell, { MarketingCard } from "@/components/MarketingShell";

const industries = [
  {
    title: "Salons & Spas",
    description:
      "Turn every checkout into a review opportunity. Route unhappy clients to your manager before they post publicly.",
  },
  {
    title: "Restaurants & Cafés",
    description:
      "Capture feedback at the table with a single QR scan — no app downloads, no friction, no lost momentum.",
  },
  {
    title: "Multi-Branch Chains",
    description:
      "Each location gets its own branded link and analytics. Manage every branch from one control panel.",
  },
];

const steps = [
  {
    step: "01",
    title: "Register your branch",
    body: "Add your business name, location, Google profile, and manager WhatsApp in under two minutes.",
  },
  {
    step: "02",
    title: "Print your QR standee",
    body: "Download your unique QR code and place it at reception, on tables, or at the checkout counter.",
  },
  {
    step: "03",
    title: "Watch reviews grow",
    body: "Happy guests tap through to Google. Unhappy guests reach your manager privately on WhatsApp.",
  },
];

export default function LandingPage() {
  return (
    <MarketingShell showNav maxWidth="full">
      <header className="mx-auto max-w-4xl pb-20 pt-10 text-center sm:pt-16">
        <p className="mb-5 inline-flex items-center rounded-full border border-[#1a5c4d]/15 bg-[#1a5c4d]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a5c4d]">
          QR Feedback for Physical Businesses
        </p>
        <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-[#1e1e24] sm:text-6xl">
          Protect your reputation.
          <br />
          <span className="text-[#1e1e24]/55">Amplify your 5-star reviews.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#1e1e24]/60 sm:text-lg">
          The Daily Pulse routes happy customers straight to Google and gives frustrated guests a
          private line to your branch manager on WhatsApp — before a bad review goes public.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="w-full rounded-2xl bg-[#1a5c4d] px-8 py-4 text-center text-[15px] font-semibold text-white shadow-lg shadow-[#1a5c4d]/20 transition hover:bg-[#164d41] active:scale-[0.98] sm:w-auto"
          >
            Create Your Branch Account
          </Link>
          <Link
            href="#how-it-works"
            className="w-full rounded-2xl border border-[#1e1e24]/10 bg-white/70 px-8 py-4 text-center text-[15px] font-medium text-[#1e1e24]/75 backdrop-blur-sm transition hover:bg-white sm:w-auto"
          >
            See how it works
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {industries.map((item) => (
            <MarketingCard key={item.title} className="p-6">
              <h2 className="text-lg font-semibold text-[#1e1e24]">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#1e1e24]/60">{item.description}</p>
            </MarketingCard>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-t border-[#1e1e24]/8 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#1e1e24]">Live in three steps</h2>
            <p className="mt-3 text-[#1e1e24]/60">Built for salons, restaurants, and multi-location brands.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((item) => (
              <MarketingCard key={item.step} className="p-7">
                <p className="text-xs font-bold tracking-[0.2em] text-[#1a5c4d]">{item.step}</p>
                <h3 className="mt-4 text-xl font-semibold text-[#1e1e24]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#1e1e24]/60">{item.body}</p>
              </MarketingCard>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl py-20 text-center">
        <MarketingCard className="px-6 py-12 sm:px-10">
          <h2 className="text-3xl font-bold tracking-tight text-[#1e1e24]">
            Ready to put a QR on your counter?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#1e1e24]/60">
            Set up your branch, get your public link, and download a print-ready QR code in minutes.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-block rounded-2xl bg-[#1a5c4d] px-8 py-4 text-[15px] font-semibold text-white transition hover:bg-[#164d41] active:scale-[0.98]"
          >
            Start Free Registration
          </Link>
        </MarketingCard>
      </section>

      <footer className="border-t border-[#1e1e24]/8 py-8 text-center text-xs text-[#1e1e24]/45">
        &copy; {new Date().getFullYear()} The Daily Pulse. Feedback intelligence for modern branches.
      </footer>
    </MarketingShell>
  );
}
