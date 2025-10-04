export const siteConfig = {
  name: "InsureChat",
  tagline: "Insurance help, made conversational.",
  description:
    "InsureChat is your AI-powered insurance concierge for real-time claim status updates, coverage answers, and next-step guidance.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://insurechat.vercel.app/",
  repo: "https://github.com/pranav89624/InsureChat",
  keywords: [
    "insurance chatbot",
    "AI insurance assistant",
    "claim status checker",
    "insurance faq bot",
    "InsureChat",
    "generative AI"
  ] as const,
};
