import type { Metadata } from "next";
import MarketingShell from "@/components/MarketingShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of The Daily Pulse platform.",
};

export default function TermsOfServicePage() {
  return (
    <MarketingShell maxWidth="lg">
      <article className="prose prose-neutral mx-auto py-12 px-2 text-[#1e1e24]">
        <h1 className="text-3xl font-bold tracking-tight text-[#1e1e24]">Terms of Service</h1>
        <p className="mt-1 text-sm text-[#1e1e24]/50">Last updated: July 2025</p>

        <Section title="1. Acceptance of Terms">
          By registering for or using The Daily Pulse platform, you agree to be bound by these
          Terms of Service. If you do not agree, you must not use the service.
        </Section>

        <Section title="2. Description of Service">
          The Daily Pulse provides a QR-based customer feedback routing service. Businesses
          register a profile, receive a unique QR code, and use the platform to route customer
          feedback to Google Reviews or a private WhatsApp channel depending on the customer's
          satisfaction level.
        </Section>

        <Section title="3. Eligibility">
          You must be at least 18 years of age and operating a legitimate registered business to
          use this service. By registering, you represent and warrant that you meet these
          requirements.
        </Section>

        <Section title="4. Account Responsibilities">
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm leading-relaxed text-[#1e1e24]/75">
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>
              You must ensure that the WhatsApp number and Google Review URL you provide are
              accurate and belong to your business.
            </li>
            <li>
              You must not use the platform to collect feedback in a deceptive, misleading, or
              manipulative manner.
            </li>
            <li>
              You are responsible for all activity that occurs under your account.
            </li>
          </ul>
        </Section>

        <Section title="5. Prohibited Uses">
          You agree not to:
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm leading-relaxed text-[#1e1e24]/75">
            <li>Use the service for any unlawful purpose or in violation of any regulations.</li>
            <li>Attempt to reverse-engineer, scrape, or disrupt the platform.</li>
            <li>Impersonate another business or individual.</li>
            <li>Use the service to send unsolicited communications.</li>
          </ul>
        </Section>

        <Section title="6. Physical Standee Orders">
          Standee orders are fulfilled by The Daily Pulse team on a best-effort basis. Delivery
          timelines, pricing (where applicable), and refund eligibility will be communicated
          directly to you via WhatsApp after you submit a standee request through the dashboard.
          All sales are final unless the product arrives damaged or defective.
        </Section>

        <Section title="7. Intellectual Property">
          All platform content, branding, code, and design is the exclusive property of The Daily
          Pulse. You are granted a limited, non-exclusive, non-transferable licence to use the
          platform solely for your business purposes during the term of your account.
        </Section>

        <Section title="8. Disclaimer of Warranties">
          The service is provided "as is" and "as available" without warranties of any kind,
          express or implied. We do not guarantee that the service will be uninterrupted,
          error-free, or meet your specific requirements.
        </Section>

        <Section title="9. Limitation of Liability">
          To the maximum extent permitted by applicable law, The Daily Pulse shall not be liable
          for any indirect, incidental, special, or consequential damages arising from your use
          of or inability to use the service.
        </Section>

        <Section title="10. Termination">
          We reserve the right to suspend or terminate your account at any time if you breach
          these terms or if the service is discontinued. You may also close your account at any
          time by contacting us.
        </Section>

        <Section title="11. Governing Law">
          These terms are governed by the laws of the Islamic Republic of Pakistan. Any disputes
          arising under these terms shall be subject to the exclusive jurisdiction of the courts
          of Lahore, Pakistan.
        </Section>

        <Section title="12. Changes to These Terms">
          We may revise these terms at any time. The "Last updated" date will reflect changes.
          Continued use of the platform after changes constitutes acceptance of the revised terms.
        </Section>

        <Section title="13. Contact">
          For questions about these terms, contact us via the details available in your business
          dashboard.
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
