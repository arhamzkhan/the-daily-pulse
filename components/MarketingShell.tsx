"use client";

/**
 * components/MarketingShell.tsx
 *
 * Shell layout for all marketing / unauthenticated pages.
 * Exports re-usable primitives (MarketingCard, input/button/link class strings)
 * consumed by login, register, privacy-policy, and terms-of-service pages.
 *
 * The navbar is sticky with a blur + border that fades in on scroll.
 * DO NOT modify authentication logic or Supabase calls below.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import VouchoLogo from "@/components/VouchoLogo";

/* ── Types ──────────────────────────────────────── */

type MarketingShellProps = {
  children: React.ReactNode;
  showNav?: boolean;
  maxWidth?: "md" | "lg" | "xl" | "full";
};

const maxWidthClass = {
  md:   "max-w-lg",
  lg:   "max-w-xl",
  xl:   "max-w-6xl",
  full: "max-w-full",
};

/* ── MarketingCard ──────────────────────────────── */

export function MarketingCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm transition-colors duration-200 ${className}`}
    >
      {children}
    </section>
  );
}

/* ── Navbar ─────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Features",     href: "/#features"     },
  { label: "How it Works", href: "/#how-it-works"  },
  { label: "Pricing",      href: "/#pricing"       },
  { label: "FAQ",          href: "/#faq"           },
];

function Navbar({ hasSession }: { hasSession: boolean | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center text-[var(--color-text)]">
          <VouchoLogo size="sm" />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-text)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          {hasSession ? (
            <Link
              href="/dashboard"
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-hi)]"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-[var(--color-muted)] transition hover:text-[var(--color-text)]"
              >
                Login
              </Link>
              <Link
                href="mailto:mail.arhamkhan1@gmail.com?subject=Voucho Demo Request"
                className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-hi)] active:scale-[0.97]"
              >
                Book a Demo
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex flex-col items-center justify-center gap-[5px] p-2 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-[1.5px] w-5 bg-[var(--color-text)]/70 transition-all duration-200 ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-[var(--color-text)]/70 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-[var(--color-text)]/70 transition-all duration-200 ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="animate-slide-down border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 px-5 pb-6 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 pt-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-muted)] transition hover:bg-[var(--color-surface-hi)] hover:text-[var(--color-text)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 border-t border-[var(--color-border)] pt-4">
            {hasSession ? (
              <Link
                href="/dashboard"
                className="rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-center text-sm font-medium text-[var(--color-text)]"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2.5 text-center text-sm font-medium text-[var(--color-muted)]"
                >
                  Login
                </Link>
                <Link
                  href="mailto:mail.arhamkhan1@gmail.com?subject=Voucho Demo Request"
                  className="rounded-lg bg-[var(--color-accent)] px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Book a Demo
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* ── MarketingShell ─────────────────────────────── */

export default function MarketingShell({
  children,
  showNav = false,
  maxWidth = "xl",
}: MarketingShellProps) {
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-200">
      {/* Subtle dot grid overlay for light theme */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:28px_28px] opacity-100 dark:opacity-20" />

      {showNav && <Navbar hasSession={hasSession} />}

      <div
        className={`relative z-10 mx-auto w-full px-4 sm:px-6 ${maxWidthClass[maxWidth]} ${showNav ? "pt-24" : "py-8"}`}
      >
        {children}
      </div>

      <footer className="relative z-10 border-t border-[var(--color-border)] py-6 text-center text-[11px] text-[var(--color-subtle)]">
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/privacy-policy"
            className="transition hover:text-[var(--color-muted)] underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          <span aria-hidden>·</span>
          <Link
            href="/terms-of-service"
            className="transition hover:text-[var(--color-muted)] underline underline-offset-2"
          >
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}

/* ── Shared primitive class strings ─────────────── */

export const marketingInputClass =
  "rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-subtle)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15 w-full";

export const marketingButtonClass =
  "rounded-xl bg-[var(--color-accent)] py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-accent-hi)] active:scale-[0.98] disabled:opacity-60 w-full";

export const marketingLinkClass = "font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hi)] transition";
