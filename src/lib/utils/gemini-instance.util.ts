import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenAI } from '@google/genai';
import { ENV } from '@/constants/env.constant';

export const generativeAI = new GoogleGenerativeAI(ENV.GEMINI_KEY);

export const genAI = new GoogleGenAI({
  apiKey: ENV.GEMINI_KEY
});
