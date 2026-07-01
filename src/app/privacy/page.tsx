import Link from "next/link";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How NMJ Group collects, uses, and protects information across our website and operating companies. Qatar-jurisdiction privacy policy.",
  alternates: { canonical: "https://nmj-group.qa/privacy" },
};

const SECTION_PADDING =
  "px-6 py-[clamp(4rem,8vw,8rem)] md:px-10 lg:px-14";

const LAST_UPDATED_ISO = "2026-05-04";
const LAST_UPDATED_DISPLAY = "May 4, 2026";

const tableOfContents = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information we collect" },
  { id: "how-we-use-your-information", label: "How we use your information" },
  { id: "sharing-within-nmj-group", label: "Sharing within NMJ Group" },
  { id: "data-security", label: "Data security" },
  { id: "data-retention", label: "Data retention" },
  { id: "your-rights", label: "Your rights" },
  { id: "children", label: "Children" },
  { id: "changes-to-this-policy", label: "Changes to this policy" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <article>
      <Hero />
      <Body />
    </article>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="privacy-hero"
      className="relative bg-[var(--color-bg-primary)]"
    >
      <div
        className={`mx-auto max-w-[1200px] ${SECTION_PADDING} pt-[clamp(6rem,10vw,10rem)]`}
      >
        <Eyebrow>Legal</Eyebrow>
        <h1
          id="privacy-hero"
          className="mt-8 font-serif text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-ink)]"
        >
          Privacy Policy
        </h1>
        <p className="mt-10 max-w-[60ch] text-[16px] leading-[1.8] text-[var(--color-text-muted)] md:text-lg">
          How NMJ Group collects, uses, and protects information across our
          website and operating companies.
        </p>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-text-subtle)]">
          Last updated ·{" "}
          <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED_DISPLAY}</time>
        </p>
      </div>
    </section>
  );
}

function Body() {
  return (
    <section
      aria-label="Privacy policy"
      className={`border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto grid max-w-[1200px] gap-16 md:grid-cols-12 md:gap-20">
        <aside className="md:col-span-3">
          <div className="md:sticky md:top-[100px]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-text-subtle)]">
              Contents
            </p>
            <ol className="mt-6 space-y-3">
              {tableOfContents.map((entry) => (
                <li key={entry.id}>
                  <Link
                    href={`#${entry.id}`}
                    className="text-[13px] leading-[1.6] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold)]"
                  >
                    {entry.label}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="md:col-span-8 md:col-start-5">
          <div className="space-y-10 text-[16px] leading-[1.8] text-[var(--color-text-muted)]">
            <Section id="introduction" title="Introduction">
              <p>
                NMJ Group (&ldquo;NMJ&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
                &ldquo;our&rdquo;) respects your privacy. This Privacy Policy
                explains what information we collect when you visit
                nmj-group.qa or interact with NMJ Group through our digital
                channels, how we use that information, and the rights you have
                over it.
              </p>
              <p>
                This policy applies to the NMJ Group corporate website and to
                general inquiries directed to NMJ Group. Each of NMJ
                Group&rsquo;s operating companies — Sapphire Plaza Hotel, Steak
                Town, Al Anaqa, Dania Maids, Dania Real Estate, Al Emara Al
                Islamiya, Next IT, and Five Nodes — operates its own platforms
                with its own privacy practices. Where you interact with one of
                those companies directly, that company&rsquo;s privacy policy
                applies.
              </p>
            </Section>

            <Section
              id="information-we-collect"
              title="Information we collect"
            >
              <p>We collect the following categories of information:</p>
              <ul className="space-y-4">
                <BulletItem>
                  <strong className="font-medium text-[var(--color-ink)]">
                    Information you provide directly.
                  </strong>{" "}
                  When you contact us by email at info@nmj-group.qa, send us a
                  message through any contact channel listed on our website, or
                  apply for a position through careers@nmj-group.qa, we receive
                  the information you choose to share — typically your name,
                  email, phone number, message content, and any documents you
                  attach.
                </BulletItem>
                <BulletItem>
                  <strong className="font-medium text-[var(--color-ink)]">
                    Information we collect automatically.
                  </strong>{" "}
                  When you visit nmj-group.qa, our hosting provider may log
                  standard technical information including your IP address,
                  browser type, the pages you visit, and the timestamps of
                  those visits. This information is used for security and
                  operational purposes.
                </BulletItem>
                <BulletItem>
                  <strong className="font-medium text-[var(--color-ink)]">
                    Cookies.
                  </strong>{" "}
                  Our website uses minimal cookies — primarily to remember
                  language preference and to support basic site functionality.
                  We do not use third-party advertising cookies on the NMJ
                  Group corporate site.
                </BulletItem>
              </ul>
            </Section>

            <Section
              id="how-we-use-your-information"
              title="How we use your information"
            >
              <p>
                We use the information we collect to respond to your inquiries,
                to maintain and improve our website, to evaluate job
                applications when received, and to comply with legal and
                regulatory obligations in Qatar.
              </p>
              <p>
                We do not sell your personal information. We do not share your
                information with third parties for their independent marketing
                purposes.
              </p>
            </Section>

            <Section
              id="sharing-within-nmj-group"
              title="Sharing within NMJ Group"
            >
              <p>
                If your inquiry is best handled by one of our operating
                companies, we may forward your message to that company along
                with your contact details so they can respond directly. By
                writing to NMJ Group, you authorize this internal routing. The
                receiving operating company will then handle your information
                under its own privacy practices.
              </p>
            </Section>

            <Section id="data-security" title="Data security">
              <p>
                We take reasonable technical and organizational measures to
                protect the information we hold. However, no method of
                transmission over the internet is fully secure, and we cannot
                guarantee absolute security.
              </p>
            </Section>

            <Section id="data-retention" title="Data retention">
              <p>
                We retain inquiry-related information for as long as necessary
                to respond to and follow up on your communication. Job
                application materials are retained for active recruitment
                cycles unless you ask us to delete them. Where legal or
                regulatory obligations require longer retention, we retain
                accordingly.
              </p>
            </Section>

            <Section id="your-rights" title="Your rights">
              <p>
                You have the right to ask what personal information we hold
                about you, to request that we correct it if it is inaccurate,
                and to ask that we delete it (subject to any legal retention
                requirements). To exercise these rights, contact us at{" "}
                <a
                  href="mailto:info@nmj-group.qa"
                  className="border-b border-[var(--color-gold)] pb-px text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
                >
                  info@nmj-group.qa
                </a>
                .
              </p>
            </Section>

            <Section id="children" title="Children">
              <p>
                Our website and corporate communications are not directed at
                children under the age of 13. We do not knowingly collect
                personal information from children.
              </p>
            </Section>

            <Section
              id="changes-to-this-policy"
              title="Changes to this policy"
            >
              <p>
                We may update this Privacy Policy from time to time. The
                &ldquo;Last updated&rdquo; date at the top of this page
                indicates when it was most recently revised. Continued use of
                nmj-group.qa after a change indicates acceptance of the revised
                policy.
              </p>
            </Section>

            <Section id="contact" title="Contact">
              <p>
                For privacy questions, write to{" "}
                <a
                  href="mailto:info@nmj-group.qa"
                  className="border-b border-[var(--color-gold)] pb-px text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
                >
                  info@nmj-group.qa
                </a>{" "}
                or to:
              </p>
              <address className="mt-6 border-l-2 border-[var(--color-gold)] py-2 pl-6 not-italic">
                <p className="font-serif text-lg leading-[1.6] text-[var(--color-ink)]">
                  NMJ Group of Companies
                </p>
                <p className="mt-2 text-[15px] leading-[1.7] text-[var(--color-text-muted)]">
                  3rd Floor, Al Muftah Plaza
                  <br />
                  Al Reem Street, Doha, Qatar
                </p>
                <p className="mt-3">
                  <a
                    href="tel:+97444440085"
                    className="font-mono text-[14px] tabular-nums text-[var(--color-ink)] transition-colors hover:text-[var(--color-gold)]"
                  >
                    +974 4444 0085
                  </a>
                </p>
              </address>
            </Section>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`heading-${id}`}
      className="scroll-mt-[100px]"
    >
      <h2
        id={`heading-${id}`}
        className="mb-6 font-serif text-[clamp(1.5rem,2.5vw,2rem)] leading-tight tracking-[-0.005em] text-[var(--color-ink)]"
      >
        {title}
      </h2>
      <div className="space-y-6 text-[15px] leading-[1.85]">{children}</div>
    </section>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span
        aria-hidden
        className="mt-2.5 inline-block h-px w-4 flex-none bg-[var(--color-gold)]"
      />
      <span>{children}</span>
    </li>
  );
}
