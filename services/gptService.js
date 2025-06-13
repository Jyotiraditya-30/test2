// services/gptService.js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const analyzePostWithGPT = async (postText) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a financial analyst. Analyze posts for stock market relevance."
      },
      {
        role: "user",
        content: `Post: "${postText}"\n\nA) Is this related to the stock market?\nB) If yes, what do you recommend?`
      }
    ]
  });

  return completion.choices[0].message.content;
};
