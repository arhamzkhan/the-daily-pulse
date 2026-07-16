"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type MarketingShellProps = {
  children: React.ReactNode;
  showNav?: boolean;
  maxWidth?: "md" | "lg" | "xl" | "full";
};

const maxWidthClass = {
  md: "max-w-lg",
  lg: "max-w-xl",
  xl: "max-w-6xl",
  full: "max-w-full",
};

export function MarketingCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl border border-[#1e1e24]/10 bg-white/75 p-8 shadow-xl shadow-[#1e1e24]/5 backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-[#fdfbf7] text-[#1e1e24]">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#1e1e2406_1px,transparent_1px),linear-gradient(to_bottom,#1e1e2406_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_-10%,#ffffff_0%,transparent_50%)]" />

      {showNav ? (
        <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between border-b border-[#1e1e24]/8 px-6 py-5">
          <Link href="/" className="text-lg font-semibold tracking-tight text-[#1e1e24]">
            The Daily Pulse
          </Link>
          <div className="flex items-center gap-3">
            {hasSession ? (
              <Link
                href="/dashboard"
                className="rounded-xl border border-[#1e1e24]/10 bg-white/80 px-4 py-2 text-sm font-semibold text-[#1e1e24] shadow-sm transition hover:bg-white"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden rounded-lg px-4 py-2 text-sm font-medium text-[#1e1e24]/60 transition hover:text-[#1e1e24] sm:inline-block"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl border border-[#1e1e24]/10 bg-white/80 px-4 py-2 text-sm font-semibold text-[#1e1e24] shadow-sm transition hover:bg-white"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      ) : null}

      <div className={`relative z-10 mx-auto w-full px-4 py-8 sm:px-6 ${maxWidthClass[maxWidth]}`}>
        {children}
      </div>
    </div>
  );
}

export const marketingInputClass =
  "rounded-xl border border-[#1e1e24]/12 bg-white/90 px-4 py-3 text-[#1e1e24] outline-none transition placeholder:text-[#1e1e24]/35 focus:border-[#1a5c4d]/40 focus:ring-2 focus:ring-[#1a5c4d]/15";

export const marketingButtonClass =
  "rounded-xl bg-[#1a5c4d] py-3.5 text-sm font-semibold text-white shadow-sm shadow-[#1a5c4d]/20 transition hover:bg-[#164d41] active:scale-[0.98] disabled:opacity-70";

export const marketingLinkClass = "font-medium text-[#1a5c4d] hover:text-[#134539]";
