import { getGenAI, getGenerativeAI } from '@/lib/gemini';
import { ImageContent } from '@/types/gemini.type';

export const generateFoodAnalysisByImage = async (imageParts: ImageContent[]): Promise<string> => {
  const model = getGenerativeAI().getGenerativeModel({
    model: 'gemini-1.5-pro'
  });

  const result = await model.generateContent([...imageParts, FOOD_IMAGE_ANALYSIS_PROMPT]);
  return result.response.text();
};

export const generateCaloriesAnalysisByText = async (foodName: string, weight?: number): Promise<string> => {
  const preInformation = weight
    ? `  
      음식 이름: ${foodName}
      음식 중량: ${weight}g
    `
    : `
      음식 이름: ${foodName}
    `;

  const response = await getGenAI().models.generateContent({
    model: 'gemini-2.0-flash',
    contents: preInformation + CALORIES_ANALYSIS_PROMPT
  });

  return response.text ?? NOT_VALID;
};

const NOT_VALID = '정보가 올바르지 않습니다';

const FOOD_IMAGE_ANALYSIS_PROMPT = `
  당신은 식품 영양학을 전공한 전문가입니다.
  모호한 정보가 있더라도 당신의 지식에 기반해 합리적인 수치를 예측해야 합니다.
  음식이 아니라고 판단되면, 음식이 아니라고 평문으로 응답해주세요.

  음식 사진을 분석하여 다음 정보를 제공해주세요:
  1. 음식 이름 ("menuName")
  2. 1인분 기준의 대략적인 예상 중량(g, "weight")
  3. 2번의 예상 중량 기준의 대략적인 예상 칼로리(kcal, "calories")
  4. 주요 영양성분 : 탄수화물(g, "carbohydrate"), 단백질(g, "protein"), 지방(g, "fat")
  5. 최종 분석결과는 반드시 정수로 응답해주세요.
  6. 하나의 이미지에 여러 음식이 있을 경우, 나누어서 응답해주세요.

  예시와 같은 형식으로 응답하세요.
  ⚠️ 절대 마크다운 코드 블록(예: \`\`\`json)을 포함하지 마세요.
  반드시 예시 형식을 그대로 따라하세요. 형식을 지키지 않으면 응답이 무효 처리됩니다.
  
  예시 형식:
  [
    {
      "menuName": "된장찌개",
      "weight": 250,
      "calories": 120,
      "carbohydrate": 10,
      "protein": 12,
      "fat": 8
    },
  ]
`;

const CALORIES_ANALYSIS_PROMPT = `
  당신은 식품 영양학을 전공한 전문가입니다.
  사용자로부터 음식 이름과 선택적으로 음식 중량 정보를 입력받아, 음식에 대한 영양 정보를 추정해주세요.
  모호한 정보가 있더라도 당신의 지식에 기반해 합리적인 수치를 예측해야 합니다.

  - 음식 중량이 함께 제공되었다면 해당 중량을 기준으로 추정된 영양 정보를 응답합니다.
  - 음식 중량이 제공되지 않았다면, 일반적인 성인 기준 1인분의 중량을 추정한 후 해당 중량과 추정된 영양 정보를 응답합니다.
  - 음식이 아니라고 판단되면, 음식이 아니라고 평문으로 응답해주세요.
  - 최종 분석결과는 반드시 정수로 응답해주세요.

  예시와 같은 형식으로 응답하세요.
  ⚠️ 절대 마크다운 코드 블록(예: \`\`\`json)을 포함하지 마세요.
  반드시 예시 형식을 그대로 따라하세요. 형식을 지키지 않으면 응답이 무효 처리됩니다.

  예시 형식:
  [
    {
      "calories": 450,
      "carbohydrate": 60,
      "protein": 15,
      "fat": 18,
      "weight": 300
    }
  ]
`;
