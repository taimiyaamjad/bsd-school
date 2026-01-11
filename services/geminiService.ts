import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const sendMessageToGemini = async (message: string): Promise<string> => {
  // Always create a new instance to ensure it uses the most up-to-date API key from the environment
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    return response.text || "I apologize, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
      return "The school's AI assistant is currently undergoing maintenance (API Key Issue). Please contact us directly via phone.";
    }
    return "I'm having trouble connecting to the school's knowledge base. Please try again in a moment.";
  }
};