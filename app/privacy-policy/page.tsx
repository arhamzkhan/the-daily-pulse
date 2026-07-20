import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Voucho",
  description: "How Voucho collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#1A202C] antialiased py-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Document Header */}
        <div className="border-b border-[#EAEAE7] pb-8 mb-12">
          <a href="/" className="text-xs font-bold tracking-widest uppercase text-[#1A202C]/50 hover:text-[#1A202C] transition-colors">
            ← Back to Voucho
          </a>
          <h1 className="text-4xl font-serif tracking-tight mt-6 mb-2">Privacy Policy</h1>
          <p className="text-xs text-[#1A202C]/40 tracking-wider uppercase">Last Updated: July 2026</p>
        </div>

        {/* High-Legibility Typography Wrapper */}
        <div className="prose prose-slate max-w-none text-sm leading-relaxed text-[#1A202C]/80 space-y-8 font-sans">
          
          <section className="space-y-3">
            <p className="leading-relaxed">
              Voucho ("we," "our," or "us") operates the customer feedback routing platform.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website, use our business dashboard, or interact with our physical QR
              code or NFC-enabled customer feedback standees.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">1. Information We Collect</h3>
            
            <div className="space-y-3 pl-4 border-l border-[#EAEAE7]">
              <h4 className="text-sm font-semibold text-[#1A202C]">A. For End-Users / Retail Customers (Reviewers)</h4>
              <p className="leading-relaxed">When you scan a physical Voucho QR code/NFC standee or submit feedback:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-[#1A202C]">Usage & Device Data:</strong> We automatically collect standard internet
                  log data to maintain the integrity of our analytics and prevent spam or fraud. This
                  includes anonymized IP addresses, device identifiers, browser types, operating
                  systems, referral sources, and interaction timestamps.
                </li>
                <li>
                  <strong className="text-[#1A202C]">Interaction Data:</strong> We record the specific actions taken on our
                  interface, such as whether a scan resulted in a redirection or a private feedback
                  submission.
                </li>
              </ul>
            </div>

            <div className="space-y-3 pl-4 border-l border-[#EAEAE7] mt-4">
              <h4 className="text-sm font-semibold text-[#1A202C]">B. For Business Clients (Owners & Operators)</h4>
              <p className="leading-relaxed">When you register an account to manage your business routing parameters:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-[#1A202C]">Account Information:</strong> We collect your name, business name,
                  operational email address, and account credentials via our authentication system.
                </li>
                <li>
                  <strong className="text-[#1A202C]">Configuration Data:</strong> We store the assets necessary to run your
                  routing service, including your business name, public Google Review URLs, and
                  designated WhatsApp communication numbers.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">2. How We Use Your Information</h3>
            <p className="leading-relaxed">
              We use the collected data strictly to provide, maintain, and optimize our review
              management service, specifically to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Validate and record legitimate customer interactions.</li>
              <li>
                Provide accurate scan traffic metrics and review analytics inside your business
                dashboard.
              </li>
              <li>
                Detect, prevent, and mitigate fraudulent, automated, or malicious exploitation of our
                routing pages.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">3. Cookies and Local Storage</h3>
            <p className="leading-relaxed">
              We use essential cookies and local storage tokens strictly required for user
              authentication and session management to keep business users securely logged into their
              dashboards. We do not deploy cross-site tracking or targeted advertising cookies.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">4. Data Processors and Third-Party Services</h3>
            <p className="leading-relaxed">
              To deliver our platform architecture, we securely transmit and process data with trusted
              infrastructure providers:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-[#1A202C]">Vercel Inc.:</strong> For application hosting, edge routing, and platform
                performance monitoring.
              </li>
              <li>
                <strong className="text-[#1A202C]">Supabase Inc.:</strong> For secure cloud database storage, data persistence,
                and identity authentication.
              </li>
              <li>
                <strong className="text-[#1A202C]">External Platforms:</strong> Our service routes users to third-party ecosystems
                including Google (for public reviews) and WhatsApp (for private feedback management).
                These external platforms maintain their own distinct privacy policies, and we do not
                assume responsibility or liability for their independent data handling practices.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">5. Data Retention & International Transfers</h3>
            <p className="leading-relaxed">
              Your data is securely stored within our cloud infrastructure partners whose data centers
              may be located outside of Pakistan (including the United States and European Union). We
              retain business configuration data for the lifetime of your active account. Diagnostic
              traffic logs are periodically archived or anonymized to optimize database performance.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">6. Your Data Rights & Contact Information</h3>
            <p className="leading-relaxed">
              Business users may update or modify their profile details directly via the dashboard
              interface. For account inquiries or data deletion requests, please contact us at{" "}
              <a
                href="mailto:support@voucho.com"
                className="text-[#1A202C] font-semibold underline underline-offset-2 hover:text-[#1A202C]/70"
              >
                support@voucho.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">7. Changes to This Policy</h3>
            <p className="leading-relaxed">
              We reserve the right to update this Privacy Policy at any time. When changes are made,
              we will update the "Last Updated" date at the top of this page. Continued use of the
              platform after updates constitutes acceptance of the revised policy.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">8. Children's Privacy</h3>
            <p className="leading-relaxed">
              Our services are not intended for or marketed to individuals under the age of 13. We do
              not knowingly collect personal data from children.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
