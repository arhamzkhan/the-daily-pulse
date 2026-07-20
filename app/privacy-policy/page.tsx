import type { Metadata } from "next";
import MarketingShell from "@/components/MarketingShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Voucho collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <MarketingShell maxWidth="lg">
      <article className="mx-auto max-w-2xl px-4 py-12 text-[var(--color-text)]">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)]">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[var(--color-subtle)] font-medium">Last Updated: July 17, 2026</p>

        <p className="mt-6 text-sm leading-7 text-[var(--color-muted)]">
          Voucho ("we," "our," or "us") operates the customer feedback routing platform.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information
          when you visit our website, use our business dashboard, or interact with our physical QR
          code or NFC-enabled customer feedback standees.
        </p>

        <Section title="1. Information We Collect">
          <SubSection title="A. For End-Users / Retail Customers (Reviewers)">
            <p>When you scan a physical Voucho QR code/NFC standee or submit feedback:</p>
            <ul>
              <li>
                <strong>Usage &amp; Device Data:</strong> We automatically collect standard internet
                log data to maintain the integrity of our analytics and prevent spam or fraud. This
                includes anonymized IP addresses, device identifiers, browser types, operating
                systems, referral sources, and interaction timestamps.
              </li>
              <li>
                <strong>Interaction Data:</strong> We record the specific actions taken on our
                interface, such as whether a scan resulted in a redirection or a private feedback
                submission.
              </li>
            </ul>
          </SubSection>
          <SubSection title="B. For Business Clients (Owners &amp; Operators)">
            <p>When you register an account to manage your business routing parameters:</p>
            <ul>
              <li>
                <strong>Account Information:</strong> We collect your name, business name,
                operational email address, and account credentials via our authentication system.
              </li>
              <li>
                <strong>Configuration Data:</strong> We store the assets necessary to run your
                routing service, including your business name, public Google Review URLs, and
                designated WhatsApp communication numbers.
              </li>
            </ul>
          </SubSection>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>
            We use the collected data strictly to provide, maintain, and optimize our review
            management service, specifically to:
          </p>
          <ul>
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
        </Section>

        <Section title="3. Cookies and Local Storage">
          <p>
            We use essential cookies and local storage tokens strictly required for user
            authentication and session management to keep business users securely logged into their
            dashboards. We do not deploy cross-site tracking or targeted advertising cookies.
          </p>
        </Section>

        <Section title="4. Data Processors and Third-Party Services">
          <p>
            To deliver our platform architecture, we securely transmit and process data with trusted
            infrastructure providers:
          </p>
          <ul>
            <li>
              <strong>Vercel Inc.:</strong> For application hosting, edge routing, and platform
              performance monitoring.
            </li>
            <li>
              <strong>Supabase Inc.:</strong> For secure cloud database storage, data persistence,
              and identity authentication.
            </li>
            <li>
              <strong>External Platforms:</strong> Our service routes users to third-party ecosystems
              including Google (for public reviews) and WhatsApp (for private feedback management).
              These external platforms maintain their own distinct privacy policies, and we do not
              assume responsibility or liability for their independent data handling practices.
            </li>
          </ul>
        </Section>

        <Section title="5. Data Retention &amp; International Transfers">
          <p>
            Your data is securely stored within our cloud infrastructure partners whose data centers
            may be located outside of Pakistan (including the United States and European Union). We
            retain business configuration data for the lifetime of your active account. Diagnostic
            traffic logs are periodically archived or anonymized to optimize database performance.
          </p>
        </Section>

        <Section title="6. Your Data Rights &amp; Contact Information">
          <p>
            Business users may update or modify their profile details directly via the dashboard
            interface. For account inquiries or data deletion requests, please contact us at{" "}
            <a
              href="mailto:mail.arhamkhan1@gmail.com"
              className="text-[var(--color-accent)] underline underline-offset-2 hover:text-[var(--color-accent-hi)]"
            >
              mail.arhamkhan1@gmail.com
            </a>
            .
          </p>
        </Section>

        <Section title="7. Changes to This Policy">
          <p>
            We reserve the right to update this Privacy Policy at any time. When changes are made,
            we will update the "Last Updated" date at the top of this page. Continued use of the
            platform after updates constitutes acceptance of the revised policy.
          </p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>
            Our services are not intended for or marketed to individuals under the age of 13. We do
            not knowingly collect personal data from children.
          </p>
        </Section>
      </article>
    </MarketingShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-base font-semibold text-[var(--color-text)]">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-[var(--color-muted)] [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_strong]:font-semibold [&_strong]:text-[var(--color-text)]">
        {children}
      </div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="text-sm font-semibold text-[var(--color-text)] opacity-90">{title}</h3>
      <div className="mt-2 space-y-2">{children}</div>
    </div>
  );
}
