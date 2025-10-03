import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-lg">
      <Link
        href="/"
        className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4 sm:px-6"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <h1 className="text-base font-semibold text-white sm:text-lg">
            InsureChat
          </h1>
          <p className="text-xs text-slate-300/80 sm:text-sm">
            Insurance help, made conversational.
          </p>
        </div>
      </Link>
    </header>
  );
}
