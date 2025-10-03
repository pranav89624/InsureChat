"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Send, Sparkles } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import TypingIndicator from "@/components/TypingIndicator";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
  text: "Hello! 👋 I'm InsureChat. Insurance help, made conversational.\n\n• Check claim status updates in plain language\n• Decode coverage details in seconds\n• Plan confident next steps for any policy question\n\nAsk me anything insurance-related and I'll take it from here.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (overrideMessage?: string) => {
    const content = overrideMessage ?? inputValue;
    const trimmed = content.trim();

    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmed,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          data.reply?.trim() ||
          "I’m here and ready to help with insurance-specific questions any time you need me.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Service is temporarily unavailable. Please try again shortly.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSendMessage();
    }
  };

  useEffect(() => {
    if (!inputRef.current) return;
    const textarea = inputRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, [inputValue]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden pb-12">
      <div
        className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid-spacing opacity-20 sm:opacity-30 lg:opacity-40 mix-blend-soft-light"
        aria-hidden="true"
      />

      <main className="relative z-10 mx-auto flex w-full flex-1 flex-col gap-6 px-4 pt-10 sm:gap-8 sm:px-6 lg:px-8">
        <section className="flex flex-1 flex-col gap-6 sm:gap-8">
          <div className="relative mx-auto w-full flex-1">
            <div className="relative flex md:min-h-[80vh] w-full flex-col">
              <div className="relative flex-1">
                <div className="relative px-4 sm:px-8">
                  <div className="flex-1 space-y-2">
                    {messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        message={message.text}
                        isBot={message.isBot}
                        timestamp={message.timestamp}
                      />
                    ))}
                    {isLoading && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>

              <div className="relative px-4 pt-3 sm:px-8 max-w-4xl mx-auto w-full">
                <div className="flex items-end gap-2 sm:items-center sm:gap-3">
                  <div className="relative w-full">
                    <span className="pointer-events-none absolute inset-y-0 left-4 hidden items-center text-emerald-200/80 sm:flex">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <textarea
                      ref={inputRef}
                      rows={1}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask about claims, coverage, or next steps..."
                      className="max-h-25 w-full resize-none rounded-3xl bg-white/[0.08] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400/80 transition focus:outline-none focus:ring-2 focus:ring-emerald-400/50 sm:pl-12"
                      disabled={isLoading}
                      aria-label="Message InsureChat"
                    />
                  </div>
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isLoading}
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 transition hover:from-emerald-300 hover:via-teal-300 hover:to-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex text-[11px] uppercase tracking-[0.28em] text-slate-400/80 mx-auto w-max select-none">
                  <span>Enter to send</span> &nbsp;{" "}
                  <span className="hidden sm:block">
                    {" "}
                    • Shift + Enter for newline
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
