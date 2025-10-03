import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-auto">
      <div className="pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-300 sm:flex-row">
          <p className="flex items-center gap-2 tracking-wide">
            © 2025 InsureChat. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="font-medium text-emerald-200 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="font-medium text-emerald-200 transition-colors hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
