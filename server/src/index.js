import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using gemini-1.5-flash for text generation

app.use(cors());
app.use(express.json());

app.post('/generate-prompt', async (req, res) => {
  try {
    const { userPrompt, role, tone, outputFormat, useCase } = req.body;

    if (!userPrompt || !role || !tone || !outputFormat || !useCase) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key is not configured' });
    }

    const systemPrompt = `You are a highly skilled ${role}. Your goal is to craft a powerful, effective prompt for the use-case: ${useCase}. Output must follow this tone: ${tone}, and format: ${outputFormat}. Make the final prompt clear, structured, and effective for top-level AI models.`;

    const result = await model.generateContent([systemPrompt, userPrompt]);
    const response = await result.response;
    const improvedPrompt = response.text();

    res.json({ improvedPrompt });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate prompt from Gemini. Please check your API key and try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 