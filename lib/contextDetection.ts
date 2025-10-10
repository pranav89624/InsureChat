interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

const CONTEXT_INDICATORS = [
  // Strong Pronouns & References
  " it ",
  " it?",
  " it.",
  "it?",
  "it.",
  " this ",
  " that ",
  " these ",
  " those ",
  " they ",
  " them ",
  " its ",
  " their ",

  // Demonstratives
  "above",
  "mentioned",
  "said",
  "previous",
  "earlier",
  "before",

  // Question words (follow-ups)
  " also ",
  " more ",
  " else ",
  " other ",
  " another ",
  " further ",

  // Clarifications
  "same",
  "similar",
  "related",
  "regarding",
  "about that",

  // Direct references
  "you said",
  "you mentioned",
  "you told",
  "as you said",

  // Elaboration requests (phrases)
  "tell me more",
  "more about",
  "elaborate",
  "what about",
  "how about",
];

const STANDALONE_INDICATORS = [
  "what is",
  "what are",
  "what does",
  "how do i",
  "how do you",
  "how to",
  "how can",
  "can i",
  "can you",
  "where can",
  "where is",
  "when should",
  "when is",
  "why does",
  "why is",
  "tell me about",
  "explain what",
  "explain how",
  "show me",
  "check",
  "find",
  "give me",
];

function hasContextIndicators(message: string): boolean {
  const lowerMessage = " " + message.toLowerCase() + " ";

  return CONTEXT_INDICATORS.some((indicator) =>
    lowerMessage.includes(indicator)
  );
}

function isShortMessage(message: string): boolean {
  const words = message.trim().split(/\s+/);
  return words.length <= 5;
}

function hasIncompleteQuestion(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim();

  const incompletePatterns = [
    /^(what|how|why|when|where|which|who)\??$/i,
    /^(what|how|why|when|where|which|who)\s+(about|types|kinds|benefits|options)\??$/i,
  ];

  return incompletePatterns.some((pattern) => pattern.test(lowerMessage));
}

function isStandaloneQuestion(message: string): boolean {
  const lowerMessage = message.toLowerCase();

  const hasStandalonePattern = STANDALONE_INDICATORS.some((indicator) =>
    lowerMessage.startsWith(indicator)
  );

  const isLongEnough = message.trim().split(/\s+/).length > 8;

  return hasStandalonePattern || isLongEnough;
}

function isQuickFollowUp(messageHistory: Message[]): boolean {
  if (messageHistory.length < 2) return false;

  const lastMessage = messageHistory[messageHistory.length - 1];
  if (!lastMessage.timestamp) return false;

  const timeDiff = Date.now() - new Date(lastMessage.timestamp).getTime();
  return timeDiff < 30000; // 30 seconds
}

export function shouldIncludeHistory(
  currentMessage: string,
  messageHistory: Message[] = []
): boolean {
  const trimmedMessage = currentMessage.trim();
  const lowerMessage = trimmedMessage.toLowerCase();

  const casualPhrases = [
    "hi",
    "hello",
    "hey",
    "bye",
    "goodbye",
    "thanks",
    "thank you",
    "ok",
    "okay",
  ];
  const isCasual = casualPhrases.some(
    (phrase) => lowerMessage === phrase
  );
  if (isCasual) return false;

  const hasClaimId = /\b[Cc]\d{5,6}\b/.test(trimmedMessage);
  if (hasClaimId) return false;

  const wordCount = trimmedMessage.split(/\s+/).length;
  if (wordCount <= 3) {
    const isCompleteNewQuestion = /^(what is|what are|how do|can i|where|when|who)/i.test(lowerMessage);
    if (!isCompleteNewQuestion) {
      return true;
    }
  }

  if (hasIncompleteQuestion(trimmedMessage)) {
    return true;
  }

  if (hasContextIndicators(trimmedMessage)) {
    return true;
  }

  if (isQuickFollowUp(messageHistory)) {
    return true;
  }

  if (isShortMessage(trimmedMessage) && !isStandaloneQuestion(trimmedMessage)) {
    return true;
  }

  if (isStandaloneQuestion(trimmedMessage) && !hasContextIndicators(trimmedMessage)) {
    return false;
  }

  return false;
}

export function getRelevantHistory(
  messages: Message[],
  maxMessages: number = 5
): Message[] {
  const relevantMessages = messages.filter((msg) => {
    const content = msg.content.toLowerCase();
    const isCasual = ["ok", "thanks", "bye", "hi", "hello", "hey"].some(
      (word) => content === word
    );
    return !isCasual;
  });

  return relevantMessages.slice(-maxMessages);
}

export function formatHistoryForAPI(messages: Message[]): Array<{
  role: string;
  content: string;
}> {
  return messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
}
