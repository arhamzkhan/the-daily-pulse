import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Voucho",
  description: "The terms governing your use of the Voucho platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#1A202C] antialiased py-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Document Header */}
        <div className="border-b border-[#EAEAE7] pb-8 mb-12">
          <a href="/" className="text-xs font-bold tracking-widest uppercase text-[#1A202C]/50 hover:text-[#1A202C] transition-colors">
            ← Back to Voucho
          </a>
          <h1 className="text-4xl font-serif tracking-tight mt-6 mb-2">Terms of Service</h1>
          <p className="text-xs text-[#1A202C]/40 tracking-wider uppercase">Last Updated: July 2026</p>
        </div>

        {/* High-Legibility Typography Wrapper */}
        <div className="prose prose-slate max-w-none text-sm leading-relaxed text-[#1A202C]/80 space-y-8 font-sans">
          
          <section className="space-y-3">
            <p className="leading-relaxed">
              Welcome to Voucho. By activating a business account, deploying our physical
              QR/NFC standees, or accessing our dashboard interface, you agree to be bound by the
              following Terms of Service.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">1. Scope of Service</h3>
            <p className="leading-relaxed">
              Voucho provisions a digital software-as-a-service (SaaS) platform designed to
              assist businesses in tracking scan traffic, monitoring consumer sentiment metrics, and
              managing customer feedback routing to third-party public profiles (such as Google Review
              listings) or private communication channels (such as WhatsApp).
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">2. Account Security & Registration</h3>
            <p className="leading-relaxed">
              Business clients must provide accurate and current information during registration. You
              are entirely responsible for maintaining the confidentiality of your dashboard access
              tokens and account credentials. Any unauthorized utilization of your account must be
              immediately reported to us.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">3. Service Access & Commercial Terms</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-[#1A202C]">Pricing Structure:</strong> Services are rendered based on the specific
                commercial agreements or tiers selected during your initial business setup, which may
                include one-time setup or hardware fabrication fees combined with ongoing renewal fees.
              </li>
              <li>
                <strong className="text-[#1A202C]">Cancellation & Account Closure:</strong> You may request account closure
                or service cancellation at any time by contacting us directly. Due to the immediate
                allocation of cloud computing resources and physical hardware printing costs, all
                payments made are non-refundable unless explicitly stated otherwise in writing.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">4. Acceptable Use Policy & System Integrity</h3>
            <p className="leading-relaxed">Users and clients are strictly prohibited from:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Using automated systems, bots, or scrapers to generate artificial scan traffic or
                fraudulent feedback entries.
              </li>
              <li>
                Circumventing, disabling, or tampering with the security infrastructure or caching
                systems of the application.
              </li>
              <li>
                Deploying our platform to maliciously mask, manipulate, or deceptively gate public
                feedback in direct violation of third-party ecosystem policies (including Google's core
                review guidelines).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">5. Third-Party Disclaimers</h3>
            <p className="leading-relaxed">
              Our service interacts directly with third-party platforms such as Google and WhatsApp.
              We do not own, control, or operate these external networks. You acknowledge that your
              use of third-party platforms through our routing system is entirely governed by their
              respective terms of service and platform guidelines.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">6. Intellectual Property</h3>
            <p className="leading-relaxed">
              Voucho, including its source code, interface designs, logos, software logic,
              database architecture, and proprietary documentation, remains the exclusive property of
              our founding entity. No ownership transfer occurs under these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">7. Limitation of Liability & Service Availability</h3>
            <p className="leading-relaxed">
              The platform is provided on an "as-is" and "as-available" framework. While we strive
              for maximum performance, we make no explicit guarantees regarding continuous,
              uninterrupted platform operation. We are not liable for any lost business revenues,
              indirect damages, or downstream business disruptions resulting from database downtime,
              network latencies, or upstream service provider interruptions.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">8. Account Termination</h3>
            <p className="leading-relaxed">
              We reserve the right to suspend or permanently terminate access to our services,
              dashboards, and active routing endpoints without prior notice if an account defaults on
              outstanding payment terms or is found in material violation of these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">9. Governing Law & Dispute Resolution</h3>
            <p className="leading-relaxed">
              These Terms are governed by, interpreted, and enforced under the laws of Pakistan. Any
              legal actions, disputes, or formal proceedings arising from these terms shall be subject
              to the exclusive jurisdiction of the competent courts located in Lahore, Pakistan.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-serif text-[#1A202C] font-semibold">10. Contact Details</h3>
            <p className="leading-relaxed">
              For formal inquiries, support notices, or operational questions concerning these terms,
              please contact{" "}
              <a
                href="mailto:support@voucho.com"
                className="text-[#1A202C] font-semibold underline underline-offset-2 hover:text-[#1A202C]/70"
              >
                support@voucho.com
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
