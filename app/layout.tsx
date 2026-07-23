/**
 * app/layout.tsx
 * Root layout — loads global styles and sets default metadata.
 */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Voucho",
    default: "Voucho | Reputation Engineering",
  },
  description:
    "Turn customer feedback into business growth. Collect Google reviews, recover unhappy customers and manage your reputation from one dashboard.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  robots: { index: false, follow: false },
};

import { createClient } from "@/lib/supabase/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let industryType: string | null = null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      industryType = user.user_metadata?.industry_type || null;

      if (!industryType) {
        const { data: business } = await supabase
          .from("businesses")
          .select("industry_type")
          .eq("user_id", user.id)
          .maybeSingle();

        if (business) {
          industryType = business.industry_type;
        }
      }
    }
  } catch (error) {
    // Suppress error during static prerendering / when cookies aren't available
  }

  let bgStyle = "";
  let styleObj: React.CSSProperties = {};

  if (industryType === "salon") {
    bgStyle = "bg-[#fdfbf7] text-[#2a2421]";
    styleObj = { "--color-bg": "#fdfbf7", backgroundColor: "#fdfbf7" } as React.CSSProperties;
  } else if (industryType === "gym") {
    bgStyle = "bg-[#0c0c0e] text-white";
    styleObj = { "--color-bg": "#0c0c0e", backgroundColor: "#0c0c0e" } as React.CSSProperties;
  } else if (industryType === "dining") {
    bgStyle = "bg-[#121614] text-[#f3efe4]";
    styleObj = { "--color-bg": "#121614", backgroundColor: "#121614" } as React.CSSProperties;
  } else if (industryType === "cafe") {
    bgStyle = "bg-[#f7f1e8] text-[#3d2b1f]";
    styleObj = { "--color-bg": "#f7f1e8", backgroundColor: "#f7f1e8" } as React.CSSProperties;
  }

  return (
    <html lang="en">
      <body className={`antialiased ${bgStyle}`} style={styleObj}>
        {children}
      </body>
    </html>
  );
}
