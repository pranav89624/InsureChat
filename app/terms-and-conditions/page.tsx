import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: (
      <p className="text-slate-200/80">
        By using our chatbot service, you acknowledge that you have read,
        understood, and agree to be bound by these Terms and Conditions, as well
        as our Privacy Policy. If you do not agree to these terms, please do not
        use our service.
      </p>
    ),
  },
  {
    title: "2. Service Description",
    body: (
      <>
        <p className="text-slate-200/80">Our chatbot provides:</p>
        <ul className="mt-4 space-y-2 text-slate-200/70">
          <li>Information about insurance claim statuses</li>
          <li>Answers to frequently asked questions about insurance</li>
          <li>General guidance related to insurance claims</li>
          <li>Automated responses based on your queries</li>
        </ul>
        <p className="mt-4 text-slate-200/80">
          This service is provided for informational purposes only and does not
          constitute professional insurance advice.
        </p>
      </>
    ),
  },
  {
    title: "3. User Responsibilities",
    body: (
      <>
        <p className="text-slate-200/80">As a user, you agree to:</p>
        <ul className="mt-4 space-y-2 text-slate-200/70">
          <li>Provide accurate and truthful information</li>
          <li>Use the service only for lawful purposes</li>
          <li>Not attempt to disrupt or compromise the service’s security</li>
          <li>Not use the service to transmit harmful or malicious content</li>
          <li>Respect intellectual property rights</li>
          <li>Not impersonate others or provide false information</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Disclaimer of Warranties",
    body: (
      <>
        <p className="text-slate-200/80">
          The service is provided “as is” and “as available” without warranties
          of any kind, either express or implied. We do not guarantee that:
        </p>
        <ul className="mt-4 space-y-2 text-slate-200/70">
          <li>The service will be uninterrupted or error-free</li>
          <li>All information provided will be accurate or complete</li>
          <li>The service will meet your specific requirements</li>
          <li>Any defects will be corrected</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Limitation of Liability",
    body: (
      <>
        <p className="text-slate-200/80">
          To the maximum extent permitted by law, we shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or
          any loss of profits or revenues, whether incurred directly or
          indirectly, or any loss of data, use, goodwill, or other intangible
          losses resulting from:
        </p>
        <ul className="mt-4 space-y-2 text-slate-200/70">
          <li>Your use or inability to use the service</li>
          <li>Any unauthorized access to or use of our servers</li>
          <li>
            Any interruption or cessation of transmission to or from the service
          </li>
          <li>Any bugs, viruses, or other harmful code</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Intellectual Property",
    body: (
      <p className="text-slate-200/80">
  All content, features, and functionality of the service, including but
  not limited to text, graphics, logos, and software, are the exclusive
  property of InsureChat and are protected by copyright, trademark, and
  other intellectual property laws.
      </p>
    ),
  },
  {
    title: "7. Privacy",
    body: (
      <p className="text-slate-200/80">
        Your use of the service is also governed by our Privacy Policy. Please
        review our Privacy Policy to understand our practices regarding the
        collection and use of your information.
      </p>
    ),
  },
  {
    title: "8. Modifications to Service",
    body: (
      <p className="text-slate-200/80">
        We reserve the right to modify, suspend, or discontinue the service at
        any time without notice. We shall not be liable to you or any third
        party for any modification, suspension, or discontinuance of the
        service.
      </p>
    ),
  },
  {
    title: "9. Changes to Terms",
    body: (
      <p className="text-slate-200/80">
        We may revise these Terms and Conditions from time to time. The most
        current version will always be posted on this page. By continuing to use
        the service after changes become effective, you agree to be bound by the
        revised terms.
      </p>
    ),
  },
  {
    title: "10. Governing Law",
    body: (
      <p className="text-slate-200/80">
        These Terms and Conditions shall be governed by and construed in
        accordance with the laws of [Your Jurisdiction], without regard to its
        conflict of law provisions.
      </p>
    ),
  },
  {
    title: "11. Contact Information",
    body: (
      <>
        <p className="text-slate-200/80">
          If you have any questions about these Terms and Conditions, please
          contact us.
        </p>
      </>
    ),
  },
];

export default function TermsAndConditions() {
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

        <section className="mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] shadow-[0_35px_80px_-40px_rgba(6,182,212,0.65)] backdrop-blur-2xl">
          <div className="relative px-5 py-10 sm:px-10 sm:py-12">
            <header className="relative flex flex-col gap-3 border-b border-white/10 pb-8 sm:gap-4">
              <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-emerald-200/80">
                Terms & Conditions Center
              </span>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Terms &amp; Conditions
                </h1>
                <p className="mt-2 text-sm text-slate-300/80 sm:text-base">
                  Understand the guidelines that govern your experience with
                  InsureChat.
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
