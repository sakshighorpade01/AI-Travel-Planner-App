import { GoogleGenAI } from '@google/genai';

export async function generateTripPlan(prompt) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY,
    });

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-pro-exp-03-25',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    });

    console.log("🧪 Full Gemini response:", JSON.stringify(result, null, 2));

    const candidate = result?.candidates?.[0];
    const contentParts = candidate?.content?.parts || [];

    let responseString = '';

    if (Array.isArray(contentParts)) {
      for (const part of contentParts) {
        if (typeof part === 'string') {
          responseString += part;
        } else if (typeof part?.text === 'string') {
          responseString += part.text;
        }
      }
    }

    console.log("📝 Gemini Response String:", responseString);

    if (!responseString || responseString.trim() === '') {
      throw new Error('Received empty response from Gemini API');
    }

    // ✅ Do NOT parse here — just return string
    return responseString;

  } catch (error) {
    console.error('❌ Error in generateTripPlan:', error);
    throw error;
  }
}
