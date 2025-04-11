import { generativeAI } from '@/lib/utils/gemini-instance.util';
import { ImageContent } from '@/types/gemini.type';

export async function generateFoodAnalysisByImage(imageParts: ImageContent[]) {
  const prompt = `
    당신은 식품 영양학을 전공한 전문가입니다.
    모호한 정보가 있더라도 당신의 지식에 기반해 합리적인 수치를 예측해야 합니다.
    음식이 아니라고 판단되면, 음식이 아니라고 응답해주세요.

    음식 사진을 분석하여 다음 정보를 제공해주세요:
    1. 음식 이름 ("menuName")
    2. 1인분 기준의 대략적인 예상 중량(g, "weight")
    3. 1인분 기준의 대략적인 예상 칼로리(kcal, "calories")
    4. 주요 영양성분 : 탄수화물(g, "carbohydrate"), 단백질(g, "protein"), 지방(g, "fat")
    
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

  const model = generativeAI.getGenerativeModel({
    model: 'gemini-2.0-flash'
  });

  const result = await model.generateContent([...imageParts, prompt]);
  return result.response.text();
}
