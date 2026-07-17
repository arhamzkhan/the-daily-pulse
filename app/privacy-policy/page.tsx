import type { Metadata } from "next";
import MarketingShell from "@/components/MarketingShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The Daily Pulse collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <MarketingShell maxWidth="lg">
      <article className="prose prose-neutral mx-auto py-12 px-2 text-[#1e1e24]">
        <h1 className="text-3xl font-bold tracking-tight text-[#1e1e24]">Privacy Policy</h1>
        <p className="mt-1 text-sm text-[#1e1e24]/50">Last updated: July 2025</p>

        <Section title="1. Who We Are">
          The Daily Pulse ("we", "us", or "our") operates a QR-based customer feedback routing
          platform for physical businesses in Pakistan. Our service helps businesses capture
          customer feedback and route it privately or publicly based on the customer's experience.
        </Section>

        <Section title="2. Information We Collect">
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm leading-relaxed text-[#1e1e24]/75">
            <li>
              <strong>Business owners:</strong> Name, branch name, WhatsApp number, Google Review
              URL, and email address collected during registration.
            </li>
            <li>
              <strong>End customers (QR scanners):</strong> We do not collect personally
              identifiable information from customers who scan a QR code. We only record
              anonymised interaction events (scan count, click type) associated with a business ID.
            </li>
            <li>
              <strong>Usage data:</strong> Standard server logs including IP addresses, browser
              type, and page visit timestamps may be retained for security and debugging purposes.
            </li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm leading-relaxed text-[#1e1e24]/75">
            <li>To provide and maintain the feedback routing service.</li>
            <li>To send business owners analytics summaries and order updates.</li>
            <li>To improve platform reliability and performance.</li>
            <li>To comply with applicable legal obligations.</li>
          </ul>
        </Section>

        <Section title="4. Third-Party Services">
          We use the following third-party services that may process data on our behalf:
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm leading-relaxed text-[#1e1e24]/75">
            <li>
              <strong>Supabase</strong> — database and authentication hosting (EU/US data centres).
            </li>
            <li>
              <strong>Vercel</strong> — serverless hosting and edge delivery network.
            </li>
            <li>
              <strong>WhatsApp (Meta)</strong> — customer-to-manager messaging is initiated via
              WhatsApp links. We do not have access to the content of those conversations.
            </li>
            <li>
              <strong>Google Maps</strong> — review links direct customers to Google's platform,
              which has its own privacy policy.
            </li>
          </ul>
        </Section>

        <Section title="5. Data Retention">
          Business account data is retained for the lifetime of the account. Anonymised scan and
          click event counts are retained indefinitely for analytics. You may request deletion of
          your account and associated data at any time by contacting us.
        </Section>

        <Section title="6. Your Rights">
          Depending on your jurisdiction you may have the right to access, correct, or delete the
          personal data we hold about you. To exercise any of these rights, please contact us at
          the address below.
        </Section>

        <Section title="7. Cookies">
          We use session cookies strictly necessary for authentication. We do not use advertising
          or tracking cookies.
        </Section>

        <Section title="8. Changes to This Policy">
          We may update this Privacy Policy from time to time. The "Last updated" date at the top
          of this page will reflect any changes. Continued use of the service after changes
          constitutes acceptance of the updated policy.
        </Section>

        <Section title="9. Contact">
          For any privacy-related queries, please contact us via WhatsApp or email at the details
          provided in your business dashboard.
        </Section>
      </article>
    </MarketingShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-[#1e1e24]">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-[#1e1e24]/75">{children}</div>
    </section>
  );
}
