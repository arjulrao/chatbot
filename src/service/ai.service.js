const {GoogleGenAI} = require('@google/genai')

const ai = new GoogleGenAI({});

async function generateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      systemInstruction : `
      Give answer in one line or one as short it's possible.
      `
    }
  });
    return response.text;
}


module.exports = generateResponse;