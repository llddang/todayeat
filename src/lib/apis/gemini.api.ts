import { FOOD_IMAGE_ANALYSIS_PROMPT } from '@/constants/prompt.constant';
import { getGenerativeAI } from '@/lib/utils/gemini.util';
import { ImageContent } from '@/types/gemini.type';

export const generateFoodAnalysisByImage = async (imageParts: ImageContent[]): Promise<string> => {
  const model = getGenerativeAI().getGenerativeModel({
    model: 'gemini-2.0-flash'
  });

  const result = await model.generateContent([...imageParts, FOOD_IMAGE_ANALYSIS_PROMPT]);
  return result.response.text();
};
