
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

export async function getSustainaAdvice(query: string, history: { role: 'user' | 'model', text: string }[]) {
  // Always initialize GoogleGenAI with a named parameter for apiKey using process.env.GEMINI_API_KEY directly.
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are Sustaina AI, an expert in Ghanaian food culture, local agriculture, and sustainability. 
    You help users shop at Sustaina Ghana, an eco-conscious grocery marketplace.
    
    Current Inventory Reference (Prices in GH₵):
    ${PRODUCTS.map(p => `- ${p.name}: ${p.description} (GH₵${p.price})`).join('\n')}
    
    Your goals:
    1. Answer questions about Ghanaian sustainability (e.g., "Why should I buy local brown rice instead of imported white rice?").
    2. Suggest recipes using our inventory (e.g., "How do I make a healthy Kontomire stew with your products?").
    3. Be encouraging, professional, and culturally relevant. Use local context (mentioning regions like Volta, Northern, etc., when relevant).
    4. Keep answers relatively concise but informative.
    5. Always quote prices in GH₵.
  `;

  try {
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const response = await chat.sendMessage({ message: query });
    // Correctly accessing the text property instead of calling it as a method.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Eish, I'm having a little trouble connecting. Please try again in a moment!";
  }
}
