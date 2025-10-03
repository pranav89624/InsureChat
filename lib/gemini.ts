import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Please add your GEMINI_API_KEY to .env");
}

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const result = await genAI.models.embedContent({
      model: "text-embedding-004",
      contents: text,
    });

    if (!result.embeddings || !result.embeddings[0]?.values) {
      throw new Error("No embedding returned from API");
    }

    return result.embeddings[0].values;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error("Failed to generate embedding");
  }
}

export async function generateText(
  prompt: string,
  context?: string
): Promise<string> {
  try {
    let fullPrompt = prompt;
    if (context) {
      fullPrompt = `Context:\n${context}\n\nQuestion: ${prompt}\n\nPlease provide a helpful and accurate answer based on the context above. If the context doesn't contain relevant information, say so politely.`;
    }

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: fullPrompt,
    });

    if (!result.text) {
      throw new Error("No text returned from API");
    }

    return result.text;
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text response");
  }
}

export async function generateChatResponse(
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  try {
    const conversationPrompt = messages
      .map(
        (msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
      )
      .join("\n\n");

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: conversationPrompt,
    });

    if (!result.text) {
      throw new Error("No text returned from API");
    }

    return result.text;
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw new Error("Failed to generate chat response");
  }
}

export default genAI;
