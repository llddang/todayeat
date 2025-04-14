import { CALORIES_ANALYSIS_PROMPT, FOOD_IMAGE_ANALYSIS_PROMPT } from '@/constants/prompt.constant';
import { getGenAI, getGenerativeAI } from '@/lib/utils/gemini.util';
import { ImageContent } from '@/types/gemini.type';

export const generateFoodAnalysisByImage = async (imageParts: ImageContent[]): Promise<string> => {
  const model = getGenerativeAI().getGenerativeModel({
    model: 'gemini-2.0-flash'
  });

  const result = await model.generateContent([...imageParts, FOOD_IMAGE_ANALYSIS_PROMPT]);
  return result.response.text();
};

export const generateCaloriesAnalysisByText = async (foodName: string, weight: number): Promise<string> => {
  const preInfomation = `  
    음식 이름: ${foodName}
    음식 중량: ${weight}g
  `;

  const response = await getGenAI().models.generateContent({
    model: 'gemini-2.0-flash',
    contents: preInfomation + CALORIES_ANALYSIS_PROMPT
  });

  return response.text ?? NOT_VALID;
};

const NOT_VALID = '정보가 올바르지 않습니다';
