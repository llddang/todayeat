import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenAI } from '@google/genai';
import { ENV, ENV_ERROR } from '@/constants/env.constant';

if (!ENV.GEMINI_KEY) throw new Error(ENV_ERROR.GEMINI_KEY);

export const generativeAI = new GoogleGenerativeAI(ENV.GEMINI_KEY);

export const genAI = new GoogleGenAI({
  apiKey: ENV.GEMINI_KEY
});
