import Link from "next/link";

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
    <div className="min-h-screen bg-[#09090b] text-zinc-100 antialiased">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_-10%,#1c1917_0%,#09090b_55%)]" />

      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between border-b border-white/8 px-6 py-5">
        <span className="text-lg font-bold tracking-tight text-white">The Daily Pulse</span>
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition hover:text-white sm:inline-block"
          >
            Dashboard
          </Link>
          <Link
            href="/register"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <header className="relative z-10 mx-auto max-w-4xl px-6 pb-20 pt-16 text-center sm:pt-24">
        <p className="mb-5 inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-400">
          QR Feedback for Physical Businesses
        </p>
        <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
          Protect your reputation.
          <br />
          <span className="text-zinc-400">Amplify your 5-star reviews.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          The Daily Pulse routes happy customers straight to Google and gives frustrated guests a
          private line to your branch manager on WhatsApp — before a bad review goes public.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="w-full rounded-2xl bg-white px-8 py-4 text-center text-[15px] font-semibold text-[#09090b] shadow-lg shadow-white/10 transition active:scale-[0.98] sm:w-auto"
          >
            Create Your Branch Account
          </Link>
          <Link
            href="#how-it-works"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-center text-[15px] font-medium text-zinc-300 transition hover:bg-white/[0.06] sm:w-auto"
          >
            See how it works
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {industries.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="relative z-10 border-t border-white/8 bg-white/[0.02] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">Live in three steps</h2>
            <p className="mt-3 text-zinc-400">Built for salons, restaurants, and multi-location brands.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-white/8 bg-[#111115] p-7"
              >
                <p className="text-xs font-bold tracking-[0.2em] text-emerald-400">{item.step}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent px-6 py-12 sm:px-10">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Ready to put a QR on your counter?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Set up your branch, get your public link, and download a print-ready QR code in minutes.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-block rounded-2xl bg-emerald-500 px-8 py-4 text-[15px] font-semibold text-[#052e16] transition hover:bg-emerald-400 active:scale-[0.98]"
          >
            Start Free Registration
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/8 py-8 text-center text-xs text-zinc-600">
        &copy; {new Date().getFullYear()} The Daily Pulse. Feedback intelligence for modern branches.
      </footer>
    </div>
  );
}
