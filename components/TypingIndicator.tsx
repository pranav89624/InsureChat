export default function TypingIndicator() {
  return (
    <div className="flex justify-start py-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="glass-surface relative max-w-[68%] rounded-3xl rounded-tl-xl px-5 py-4">
        <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-emerald-300/70">
          InsureChat
        </div>
        <div className="flex items-center gap-2">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="inline-flex h-2.5 w-2.5 animate-ripple rounded-full bg-emerald-400/80"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-emerald-400/10 blur-3xl" />
      </div>
    </div>
  );
}
