import { FOOD_IMAGE_ANALYSIS_PROMPT } from '@/constants/prompt.constant';
import { generativeAI } from '@/lib/utils/gemini-instance.util';
import { ImageContent } from '@/types/gemini.type';

export async function generateFoodAnalysisByImage(imageParts: ImageContent[]) {
  const model = generativeAI.getGenerativeModel({
    model: 'gemini-2.0-flash'
  });

  const result = await model.generateContent([...imageParts, FOOD_IMAGE_ANALYSIS_PROMPT]);
  return result.response.text();
}
