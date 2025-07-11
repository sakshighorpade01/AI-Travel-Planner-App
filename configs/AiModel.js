export async function generateTripPlan(prompt) {
  try {
    // Get the API key from environment variables
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
    
    console.log("🔑 API Key check:", apiKey ? "Present" : "Missing");
    console.log("🔑 API Key length:", apiKey ? apiKey.length : 0);
    
    if (!apiKey) {
      throw new Error('Google Gemini API key is not configured. Please check your .env file.');
    }
    
    console.log("🚀 Sending prompt to Gemini...");
    
    // Use direct HTTP request to Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini API Error:', errorText);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("🧪 Full Gemini response:", JSON.stringify(result, null, 2));

    const responseString = result.candidates?.[0]?.content?.parts?.[0]?.text || '';

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
