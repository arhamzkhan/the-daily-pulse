import type { Metadata } from "next";
import MarketingShell from "@/components/MarketingShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the Voucho platform.",
};

export default function TermsOfServicePage() {
  return (
    <MarketingShell maxWidth="lg">
      <article className="mx-auto max-w-2xl px-4 py-12 text-[var(--color-text)]">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)]">Terms of Service</h1>
        <p className="mt-2 text-sm text-[var(--color-subtle)] font-medium">Last Updated: July 17, 2026</p>

        <p className="mt-6 text-sm leading-7 text-[var(--color-muted)]">
          Welcome to Voucho. By activating a business account, deploying our physical
          QR/NFC standees, or accessing our dashboard interface, you agree to be bound by the
          following Terms of Service.
        </p>

        <Section title="1. Scope of Service">
          <p>
            Voucho provisions a digital software-as-a-service (SaaS) platform designed to
            assist businesses in tracking scan traffic, monitoring consumer sentiment metrics, and
            managing customer feedback routing to third-party public profiles (such as Google Review
            listings) or private communication channels (such as WhatsApp).
          </p>
        </Section>

        <Section title="2. Account Security &amp; Registration">
          <p>
            Business clients must provide accurate and current information during registration. You
            are entirely responsible for maintaining the confidentiality of your dashboard access
            tokens and account credentials. Any unauthorized utilization of your account must be
            immediately reported to us.
          </p>
        </Section>

        <Section title="3. Service Access &amp; Commercial Terms">
          <ul>
            <li>
              <strong>Pricing Structure:</strong> Services are rendered based on the specific
              commercial agreements or tiers selected during your initial business setup, which may
              include one-time setup or hardware fabrication fees combined with ongoing renewal fees.
            </li>
            <li>
              <strong>Cancellation &amp; Account Closure:</strong> You may request account closure
              or service cancellation at any time by contacting us directly. Due to the immediate
              allocation of cloud computing resources and physical hardware printing costs, all
              payments made are non-refundable unless explicitly stated otherwise in writing.
            </li>
          </ul>
        </Section>

        <Section title="4. Acceptable Use Policy &amp; System Integrity">
          <p>Users and clients are strictly prohibited from:</p>
          <ul>
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
        </Section>

        <Section title="5. Third-Party Disclaimers">
          <p>
            Our service interacts directly with third-party platforms such as Google and WhatsApp.
            We do not own, control, or operate these external networks. You acknowledge that your
            use of third-party platforms through our routing system is entirely governed by their
            respective terms of service and platform guidelines.
          </p>
        </Section>

        <Section title="6. Intellectual Property">
          <p>
            Voucho, including its source code, interface designs, logos, software logic,
            database architecture, and proprietary documentation, remains the exclusive property of
            our founding entity. No ownership transfer occurs under these terms.
          </p>
        </Section>

        <Section title="7. Limitation of Liability &amp; Service Availability">
          <p>
            The platform is provided on an "as-is" and "as-available" framework. While we strive
            for maximum performance, we make no explicit guarantees regarding continuous,
            uninterrupted platform operation. We are not liable for any lost business revenues,
            indirect damages, or downstream business disruptions resulting from database downtime,
            network latencies, or upstream service provider interruptions.
          </p>
        </Section>

        <Section title="8. Account Termination">
          <p>
            We reserve the right to suspend or permanently terminate access to our services,
            dashboards, and active routing endpoints without prior notice if an account defaults on
            outstanding payment terms or is found in material violation of these Terms.
          </p>
        </Section>

        <Section title="9. Governing Law &amp; Dispute Resolution">
          <p>
            These Terms are governed by, interpreted, and enforced under the laws of Pakistan. Any
            legal actions, disputes, or formal proceedings arising from these terms shall be subject
            to the exclusive jurisdiction of the competent courts located in Lahore, Pakistan.
          </p>
        </Section>

        <Section title="10. Contact Details">
          <p>
            For formal inquiries, support notices, or operational questions concerning these terms,
            please contact{" "}
            <a
              href="mailto:mail.arhamkhan1@gmail.com"
              className="text-[var(--color-accent)] underline underline-offset-2 hover:text-[var(--color-accent-hi)]"
            >
              mail.arhamkhan1@gmail.com
            </a>
            .
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
