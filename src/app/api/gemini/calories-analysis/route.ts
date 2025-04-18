import { NextResponse } from 'next/server';
import { AI_ERROR_KEYS, AI_ERROR_MESSAGE, isAIErrorResponse } from '@/constants/ai-error-message.constant';
import { generateCaloriesAnalysisByText } from '@/apis/gemini.api';
import { parseGeminiResponse } from '@/lib/gemini';
import { updateCaloriesAnalysisResult } from '@/apis/analysis-request.api';

export const POST = async (req: Request) => {
  try {
    const { id, userId, menuName, weight } = await req.json();

    if (!id || !menuName) {
      return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.MISSING_INPUT), {
        status: AI_ERROR_MESSAGE.MISSING_INPUT.status
      });
    }

    if (weight !== undefined && (typeof weight !== 'number' || weight < 0)) {
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

    const parsed = parsedResult[0];
    const weightToUpdate = parsed.weight ?? weight;
    const { calories, carbohydrate, protein, fat } = parsed;

    const { error } = await updateCaloriesAnalysisResult({
      id,
      userId,
      menuName,
      weight: weightToUpdate,
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

    return NextResponse.json({ id, weight: weightToUpdate, calories, carbohydrate, protein, fat });
  } catch (error) {
    console.error('분석 에러:', error);
    return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.UNKNOWN), {
      status: AI_ERROR_MESSAGE.UNKNOWN.status
    });
  }
};
