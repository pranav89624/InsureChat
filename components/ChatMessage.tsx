"use client";

import { useEffect, useState } from "react";
import { Sparkles, UserRound } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatMessage({
  message,
  isBot,
  timestamp,
}: ChatMessageProps) {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    setFormattedTime(
      timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }, [timestamp]);

  const label = isBot ? "InsureChat" : "You";

  return (
    <div
      className={`flex w-full ${
        isBot ? "justify-start" : "justify-end"
      } mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500`}
    >
      <div
        className={`flex max-w-[76%] sm:max-w-[66%] items-end gap-3 ${
          isBot ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div className="relative flex items-center justify-center rounded-lg sm:rounded-xl border border-white/10 bg-white/5 shadow-glass backdrop-blur-xl">
          <div className="relative flex m-1 h-6 w-6 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200">
            {isBot ? (
              <Sparkles className="h-4 w-4 sm:h-6 sm:w-6" />
            ) : (
              <UserRound className="h-4 w-4 sm:h-6 sm:w-6" />
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div
            className={`group relative rounded-3xl px-5 py-5 text-sm sm:text-base leading-relaxed tracking-tight shadow-lg transition-all ${
              isBot
                ? "glass-surface border-emerald-400/20 text-slate-100"
                : "bg-gradient-to-br from-emerald-500/90 via-teal-400/90 to-cyan-400/80 text-white shadow-elevated"
            } ${isBot ? "rounded-tl-xl" : "rounded-tr-xl"}`}
          >
            <div
              className={`absolute top-0 text-[11px] uppercase tracking-[0.24em] ${
                isBot ? "left-6 text-emerald-300/80" : "right-6 text-white/60"
              }`}
            >
              {label}
            </div>
            <p className="whitespace-pre-wrap break-words text-[0.95rem] [word-spacing:0.2em]">
              {message}
            </p>
            <div className="absolute -bottom-3 h-3 w-3 rounded-full bg-emerald-400/40 blur-lg opacity-0 transition-opacity group-hover:opacity-80" />
          </div>
          {formattedTime && (
            <p
              className={`text-[11px] uppercase tracking-[0.28em] ${
                isBot ? "text-emerald-200/60" : "text-slate-300/60 text-right"
              }`}
            >
              {formattedTime}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
