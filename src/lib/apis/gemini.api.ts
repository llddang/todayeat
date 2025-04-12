import { FOOD_IMAGE_ANALYSIS_PROMPT } from '@/constants/prompt.constant';
import { generativeAI } from '@/lib/utils/gemini.util';
import { ImageContent } from '@/types/gemini.type';

export const generateFoodAnalysisByImage = async (imageParts: ImageContent[]): Promise<string> => {
  const model = generativeAI.getGenerativeModel({
    model: 'gemini-2.0-flash'
  });

  const result = await model.generateContent([...imageParts, FOOD_IMAGE_ANALYSIS_PROMPT]);
  return result.response.text();
};
