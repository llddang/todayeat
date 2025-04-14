import { NextResponse } from 'next/server';
import { AI_ERROR_KEYS, AI_ERROR_MESSAGE, isAIErrorResponse } from '@/constants/ai-error-message.constant';
import { generateCaloriesAnalysisByText } from '@/lib/apis/gemini.api';
import { parseGeminiResponse } from '@/lib/utils/gemini.util';
import { updateCaloriesAnalysisResult } from '@/lib/apis/analysis-request.api';

export const POST = async (req: Request) => {
  try {
    const { id, menuName, weight } = await req.json();

    if (!id || !menuName || !weight) {
      return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.MISSING_INPUT), {
        status: AI_ERROR_MESSAGE.MISSING_INPUT.status
      });
    }

    if (typeof weight !== 'number' || weight <= 0) {
      return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.INVALID_INPUT), {
        status: AI_ERROR_MESSAGE.INVALID_INPUT.status
      });
    }

    const generatedTextResult = await generateCaloriesAnalysisByText(menuName, weight);
    const parsedResult = parseGeminiResponse(generatedTextResult);

    if (parsedResult.length === 0) {
      console.error('유효한 이미지 없음');
      return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.NO_VALID_FOOD_FOUND), {
        status: AI_ERROR_MESSAGE.NO_VALID_FOOD_FOUND.status
      });
    }

    const { calories, carbohydrate, protein, fat } = parsedResult[0];

    const { error } = await updateCaloriesAnalysisResult({
      id,
      menuName,
      weight,
      calories,
      carbohydrate,
      protein,
      fat
    });

    if (error) {
      return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.SUPABASE_INSERT_FAILED), {
        status: AI_ERROR_MESSAGE.SUPABASE_INSERT_FAILED.status
      });
    }

    return NextResponse.json({ id, calories, carbohydrate, protein, fat });
  } catch (error) {
    console.error('분석 에러:', error);
    return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.UNKNOWN), {
      status: AI_ERROR_MESSAGE.UNKNOWN.status
    });
  }
};
