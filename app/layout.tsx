/**
 * app/layout.tsx
 * Root layout — loads global styles and sets default metadata.
 */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | The Daily Pulse",
    default: "The Daily Pulse — Feedback Intelligence",
  },
  description: "Localized customer feedback routing for modern businesses.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
