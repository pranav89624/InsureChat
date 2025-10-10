import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import Claim from "@/models/Claim";
import {
  generateEmbedding,
  generateText,
  generateChatResponse,
} from "@/lib/gemini";
import { findTopKSimilar, hasRelevantResults } from "@/lib/vectorSearch";
import {
  shouldIncludeHistory,
  getRelevantHistory,
  formatHistoryForAPI,
} from "@/lib/contextDetection";

interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    const messageHistory: HistoryMessage[] = Array.isArray(history)
      ? history
      : [];

    await connectDB();

    const messageLower = message.toLowerCase().trim();
    const words = messageLower.split(" ");

    const greetings = [
      "hi",
      "hello",
      "hey",
      "hii",
      "helo",
      "good morning",
      "good afternoon",
      "good evening",
    ];
    const farewells = [
      "bye",
      "goodbye",
      "good bye",
      "see you",
      "thanks",
      "thank you",
      "thx",
    ];
    const acknowledgments = [
      "ok",
      "okay",
      "sure",
      "yes",
      "no",
      "alright",
      "fine",
      "cool",
      "got it",
      "understood",
      "yep",
      "nope",
      "yeah",
      "nah",
      "k",
      "kk",
    ];

    if (
      greetings.some(
        (greeting) =>
          messageLower === greeting ||
          messageLower.startsWith(greeting + " ") ||
          messageLower.endsWith(" " + greeting)
      )
    ) {
      const greetingResponses = [
        "Hello! 👋 How can I assist you with your insurance needs today?",
        "Hi there! 😊 I'm here to help with your insurance questions. What would you like to know?",
        "Hey! Welcome! I can help you check claim status or answer insurance questions. How may I help?",
      ];
      const randomGreeting =
        greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
      return NextResponse.json({ reply: randomGreeting });
    }

    if (
      farewells.some(
        (farewell) =>
          messageLower === farewell ||
          messageLower.startsWith(farewell + " ") ||
          messageLower.endsWith(" " + farewell)
      )
    ) {
      const farewellResponses = [
        "You're welcome! Have a great day! 😊 Feel free to return if you have more questions.",
        "Goodbye! Take care and don't hesitate to reach out if you need help with insurance matters. 👋",
        "Thank you for using our service! Wishing you a wonderful day ahead! 🌟",
      ];
      const randomFarewell =
        farewellResponses[Math.floor(Math.random() * farewellResponses.length)];
      return NextResponse.json({ reply: randomFarewell });
    }

    if (
      words.length <= 3 &&
      acknowledgments.some((ack) => messageLower === ack || words.includes(ack))
    ) {
      const acknowledgmentResponses = [
        "Great! Is there anything else about insurance I can help you with?",
        "Perfect! Do you have any insurance questions I can answer?",
        "Alright! Feel free to ask me about claims, policies, or coverage.",
        "Got it! Let me know if you need help with claim status or insurance information.",
        "Sure! What would you like to know about your insurance?",
      ];
      const randomAck =
        acknowledgmentResponses[
          Math.floor(Math.random() * acknowledgmentResponses.length)
        ];
      return NextResponse.json({ reply: randomAck });
    }

    const claimIdPattern = /\b[Cc]\d{5,6}\b/;
    const claimIdMatch = message.match(claimIdPattern);

    if (claimIdMatch) {
      const claimId = claimIdMatch[0].toUpperCase();

      try {
        const claim = await Claim.findOne({ claimId }).lean();

        if (claim) {
          const reply =
            `I found your claim ${claim.claimId}:\n\n` +
            `Customer: ${claim.customerName}\n` +
            `Policy Number: ${claim.policyNumber}\n` +
            `Status: ${claim.status}\n` +
            `Amount: $${claim.amount.toLocaleString()}\n` +
            `Date: ${claim.date}\n\n` +
            `Is there anything else you'd like to know about this claim?`;

          return NextResponse.json({ reply });
        }
      } catch (error) {
        console.error("Error fetching claim:", error);
      }
    }

    const claimStatusKeywords = [
      "check claim",
      "claim status",
      "my claim",
      "track claim",
      "claim number",
    ];
    const isAskingAboutClaim = claimStatusKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword)
    );

    if (isAskingAboutClaim && !claimIdMatch) {
      const reply =
        "I'd be happy to help you check your claim status! Please provide your claim ID (format: C12345 or C123456). You can find it on your claim confirmation email or documentation.";
      return NextResponse.json({ reply });
    }

    let queryEmbedding: number[];
    try {
      queryEmbedding = await generateEmbedding(message);
    } catch (error) {
      console.error("Error generating query embedding:", error);
      const fallbackReply =
        "I'm having trouble processing your question right now. This looks complex - please contact our customer support team for assistance at 1-800-INSURANCE or support@insuranceclaimassistant.com.";
      return NextResponse.json({ reply: fallbackReply });
    }

    const faqs = await FAQ.find({}).lean();

    if (faqs.length === 0) {
      const reply =
        "I apologize, but I don't have access to the FAQ database at the moment. Please contact our customer support team at 1-800-INSURANCE or support@insuranceclaimassistant.com for assistance.";
      return NextResponse.json({ reply });
    }

    const similarFAQs = findTopKSimilar(queryEmbedding, faqs, 3, 0.5);

    const HIGH_RELEVANCE_THRESHOLD = 0.6;
    const LOW_RELEVANCE_THRESHOLD = 0.3;
    const insuranceKeywords = [
      "insurance",
      "claim",
      "policy",
      "premium",
      "coverage",
      "deductible",
      "beneficiary",
      "nominee",
      "settlement",
      "document",
      "payment",
      "renew",
      "cancel",
      "health",
      "life",
      "auto",
      "accident",
      "medical",
      "hospital",
      "reimbursement",
      "cashless",
      "pre-authorization",
      "co-payment",
      "copay",
    ];

    const isInsuranceRelated =
      insuranceKeywords.some((keyword) =>
        message.toLowerCase().includes(keyword)
      ) ||
      (similarFAQs.length > 0 &&
        similarFAQs[0].similarity > LOW_RELEVANCE_THRESHOLD);

    if (!isInsuranceRelated) {
      const offtopicReply =
        "I'm specifically designed to help with insurance-related questions only, such as:\n\n" +
        "- Checking claim status\n" +
        "- Insurance policy information\n" +
        "- Claims process and documentation\n" +
        "- Premium payments and renewals\n" +
        "- Coverage and benefits\n\n" +
        "Please ask me anything related to insurance, and I'll be happy to help! 😊";

      return NextResponse.json({ reply: offtopicReply });
    }

    if (!hasRelevantResults(similarFAQs, HIGH_RELEVANCE_THRESHOLD)) {
      const lowConfidenceContext =
        similarFAQs.length > 0
          ? similarFAQs
              .map(
                (result, idx) =>
                  `Reference ${idx + 1}:\nQ: ${result.document.question}\nA: ${
                    result.document.answer
                  }`
              )
              .join("\n\n")
          : "";

      try {
        const needsHistory = shouldIncludeHistory(message, messageHistory);

        let aiReply: string;

        if (needsHistory && messageHistory.length > 0) {
          const relevantHistory = getRelevantHistory(messageHistory, 5);
          const formattedHistory = formatHistoryForAPI(relevantHistory);

          const systemMessage = {
            role: "system" as const,
            content:
              "You are a helpful insurance assistant. Answer questions in a friendly, professional way. " +
              (lowConfidenceContext
                ? `Here are some related FAQs for reference:\n${lowConfidenceContext}\n\n`
                : "") +
              "If you're not completely certain, acknowledge the limitation and suggest contacting support for specific details.",
          };

          const messages = [
            systemMessage,
            ...formattedHistory,
            { role: "user" as const, content: message },
          ];

          aiReply = await generateChatResponse(messages);
        } else {
          const aiPrompt = `You are a helpful insurance assistant. Answer this insurance-related question in a friendly, professional way. If you're not completely certain, acknowledge the limitation and suggest contacting support for specific details.\n\nQuestion: ${message}\n\n${
            lowConfidenceContext
              ? `Here are some related FAQs for context:\n${lowConfidenceContext}`
              : ""
          }`;

          aiReply = await generateText(aiPrompt, "");
        }

        aiReply = aiReply
          .replace(/\*\*/g, "")
          .replace(/\*/g, "")
          .replace(/_/g, "");

        const disclaimerReply =
          aiReply +
          "\n\nNote: For specific details about your policy or claim, please contact our support team at 1-800-INSURANCE or support@insuranceclaimassistant.com.";

        return NextResponse.json({ reply: disclaimerReply });
      } catch (error) {
        console.error("Error generating AI response:", error);
        const fallbackReply =
          "I don't have specific information about that in my knowledge base right now. Please contact our customer support team for detailed assistance:\n\n" +
          "Phone: 1-800-INSURECHAT\n" +
          "Email: support@insurechat.com\n" +
          "Hours: Monday-Friday, 8 AM - 8 PM EST";

        return NextResponse.json({ reply: fallbackReply });
      }
    }
    const context = similarFAQs
      .map(
        (result, idx) =>
          `FAQ ${idx + 1} (relevance: ${(result.similarity * 100).toFixed(
            1
          )}%):\n` +
          `Q: ${result.document.question}\n` +
          `A: ${result.document.answer}`
      )
      .join("\n\n");

    let reply: string;
    try {
      const needsHistory = shouldIncludeHistory(message, messageHistory);

      if (needsHistory && messageHistory.length > 0) {
        const relevantHistory = getRelevantHistory(messageHistory, 5);
        const formattedHistory = formatHistoryForAPI(relevantHistory);

        const systemMessage = {
          role: "system" as const,
          content: `You are a helpful insurance assistant. Use the following FAQ knowledge to answer questions:\n\n${context}\n\nAnswer in a friendly, professional way based on this knowledge and the conversation history.`,
        };

        const messages = [
          systemMessage,
          ...formattedHistory,
          { role: "user" as const, content: message },
        ];

        reply = await generateChatResponse(messages);
      } else {
        reply = await generateText(message, context);
      }

      reply = reply.replace(/\*\*/g, "").replace(/\*/g, "").replace(/_/g, "");
    } catch (error) {
      console.error("Error generating response:", error);

      if (similarFAQs.length > 0) {
        reply = similarFAQs[0].document.answer;
        reply = reply.replace(/\*\*/g, "").replace(/\*/g, "").replace(/_/g, "");
      } else {
        reply =
          "I'm having trouble generating a response right now. Please contact our customer support team for assistance.";
      }
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        reply:
          "An error occurred while processing your request. Please try again or contact our support team.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Please use POST request." },
    { status: 405 }
  );
}
