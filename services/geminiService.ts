
import { GoogleGenAI, Type } from "@google/genai";
import { FormattingOptions, ProcessedNote } from "../types";

interface FileData {
  data: string;
  mimeType: string;
  name: string;
}

export const processNoteWithGemini = async (
  files: FileData[],
  options: FormattingOptions
): Promise<ProcessedNote> => {
  // Hardcoded API key as explicitly requested
  const ai = new GoogleGenAI({ apiKey: "AIzaSyCWAwPhlW925NYg0q9cgZIAmnp9pLL8EvY" });
  
  const parts: any[] = [];
  
  files.forEach((file, index) => {
    parts.push({
      inlineData: {
        data: file.data.split(',')[1] || file.data,
        mimeType: file.mimeType
      }
    });
    parts.push({ text: `Source image #${index + 1}: ${file.name}` });
  });

  const systemInstruction = `You are an expert Document Architect. 
    Your task is to convert each provided source material into a unique page in a professional white paper.
    
    CRITICAL 1:1 MAPPING RULE:
    - If the user provides 5 images, you MUST generate exactly 5 pages.
    - DO NOT combine content from different source images onto a single page.
    - Each page in the 'pages' array must correspond to exactly one input source part.
    
    STYLE RULES:
    1. STYLE: Adhere to the "${options.style}" aesthetic.
    2. FORMAT: Partition into a 'pages' array for ${options.paperSize} printing.
    3. SUMMARY: Include an executive summary based on the collective content.
    4. QUALITY: Use academic, high-level vocabulary and structured headings.
    
    Output ONLY raw JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ 
        parts: [
          ...parts, 
          { text: `Synthesize these ${files.length} source images into a ${files.length}-page professional ${options.paperSize} document. Ensure Page 1 represents Image 1, Page 2 represents Image 2, and so on.` }
        ] 
      }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            pages: {
              type: Type.ARRAY,
              description: `Must have exactly ${files.length} items.`,
              items: {
                type: Type.OBJECT,
                properties: {
                  pageNumber: { type: Type.INTEGER },
                  sections: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        heading: { type: Type.STRING },
                        content: { type: Type.STRING }
                      },
                      required: ["heading", "content"]
                    }
                  }
                },
                required: ["pageNumber", "sections"]
              }
            },
            footer: { type: Type.STRING }
          },
          required: ["title", "pages"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Synthesis engine returned empty response.");
    
    return JSON.parse(text) as ProcessedNote;
  } catch (err: any) {
    console.error("Synthesis error:", err);
    throw new Error(err.message || "Synthesis failed. Please ensure materials are legible.");
  }
};
