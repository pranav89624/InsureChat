import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    body: (
      <>
        <p className="text-slate-200/80">
          We may collect the following types of information:
        </p>
        <ul className="mt-4 space-y-2 text-slate-200/70">
          <li>Messages and queries you send through the chatbot</li>
          <li>
            Technical information such as IP address, browser type, and device
            information
          </li>
          <li>Usage data including interaction patterns and timestamps</li>
          <li>Claim-related information you voluntarily provide</li>
        </ul>
      </>
    ),
  },
  {
    title: "2. How We Use Your Information",
    body: (
      <>
        <p className="text-slate-200/80">
          We use the collected information for:
        </p>
        <ul className="mt-4 space-y-2 text-slate-200/70">
          <li>Providing and improving our chatbot services</li>
          <li>Responding to your insurance-related queries</li>
          <li>Analyzing usage patterns to enhance user experience</li>
          <li>Maintaining security and preventing fraud</li>
          <li>Complying with legal obligations</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Information Sharing",
    body: (
      <>
        <p className="text-slate-200/80">
          We do not sell, trade, or rent your personal information to third
          parties. We may share your information only in the following
          circumstances:
        </p>
        <ul className="mt-4 space-y-2 text-slate-200/70">
          <li>With your explicit consent</li>
          <li>To comply with legal requirements or court orders</li>
          <li>To protect our rights, property, or safety</li>
          <li>
            With service providers who assist in our operations (under
            confidentiality agreements)
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Data Security",
    body: (
      <p className="text-slate-200/80">
        We implement appropriate technical and organizational security measures
        to protect your personal information against unauthorized access,
        alteration, disclosure, or destruction. However, no method of
        transmission over the internet is completely secure.
      </p>
    ),
  },
  {
    title: "5. Your Rights",
    body: (
      <>
        <p className="text-slate-200/80">You have the right to:</p>
        <ul className="mt-4 space-y-2 text-slate-200/70">
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your personal information</li>
          <li>Opt out of certain data processing activities</li>
          <li>Lodge a complaint with a data protection authority</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Cookies and Tracking",
    body: (
      <p className="text-slate-200/80">
        We may use cookies and similar tracking technologies to enhance your
        experience and analyze usage patterns. You can control cookie
        preferences through your browser settings.
      </p>
    ),
  },
  {
    title: "7. Changes to This Policy",
    body: (
      <p className="text-slate-200/80">
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page and
        updating the “Last Updated” date.
      </p>
    ),
  },
  {
    title: "8. Contact Us",
    body: (
      <>
        <p className="text-slate-200/80">
          If you have any questions about this Privacy Policy or our data
          practices, please contact us.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="relative isolate min-h-screen">
      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-200/80 transition hover:text-emerald-200"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10 text-emerald-200 transition group-hover:border-emerald-300/70 group-hover:text-emerald-100">
            <ArrowLeft className="h-4 w-4" />
          </span>
          Back to InsureChat
        </Link>

        <section className="mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] shadow-[0_35px_80px_-40px_rgba(16,185,129,0.65)] backdrop-blur-2xl">
          <div className="relative px-5 py-10 sm:px-10 sm:py-12">
            <header className="relative flex flex-col gap-3 border-b border-white/10 pb-8 sm:gap-4">
              <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-emerald-200/80">
                Policy Center
              </span>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Privacy Policy
                </h1>
                <p className="mt-2 text-sm text-slate-300/80 sm:text-base">
                  Clear guidance on how InsureChat handles, protects, and
                  respects your information.
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400/80">
                Last updated · October 04, 2025
              </p>
            </header>

            <div className="relative mt-10 space-y-10">
              {sections.map((section) => (
                <section key={section.title} className="space-y-4">
                  <h2 className="text-xl font-semibold text-white sm:text-2xl">
                    {section.title}
                  </h2>
                  <div className="text-sm leading-relaxed sm:text-base">
                    {section.body}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
