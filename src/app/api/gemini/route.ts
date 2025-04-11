import { NextResponse } from 'next/server';
import { AI_ERROR_KEYS, AI_ERROR_MESSAGE, isAIErrorResponse } from '@/constants/ai-error-message.constants';
import { getFoodImagesById } from '@/lib/apis/analysis-request.api';
import { generateFoodAnalysisByImage } from '@/lib/apis/gemini.api';
import { camelToSnakeObject } from '@/lib/utils/camelize.util';
import { convertImageUrlToBase64 } from '@/lib/utils/convert-image-to-base64.util';
import { parseGeminiResponse } from '@/lib/utils/parse-gemini-response.util';
import { getServerClient } from '@/lib/utils/supabase/server.util';
import { FoodAnalysisRequestsDetailDTO } from '@/types/DTO/ai.dto';
import { FoodAnalysisResult } from '@/types/gemini.type';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    const supabase = getServerClient();

    const { data, error } = await getFoodImagesById(userId);

    if (error || !data?.image_urls) {
      console.error('Supabase 에러:', error);
      return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.IMAGE_NOT_FOUND), {
        status: AI_ERROR_MESSAGE.IMAGE_NOT_FOUND.status
      });
    }

    const requestId: string = data.id;
    const imageUrls: string[] = data.image_urls;

    const imageParts = await Promise.all(imageUrls.map(convertImageUrlToBase64));

    const generatedTextResult = await generateFoodAnalysisByImage(imageParts);
    const parsedResult = parseGeminiResponse(generatedTextResult);
    if (parsedResult.length === 0) {
      console.error('유효한 이미지 없음');
      return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.NO_VALID_FOOD_FOUND), {
        status: AI_ERROR_MESSAGE.NO_VALID_FOOD_FOUND.status
      });
    }

    const insertPayload: FoodAnalysisRequestsDetailDTO[] = parsedResult.map((item: FoodAnalysisResult) => ({
      ...item,
      requestId: requestId
    }));

    const { error: insertError } = await supabase
      .from('food_analysis_requests_detail')
      .insert(camelToSnakeObject<FoodAnalysisRequestsDetailDTO[]>(insertPayload));

    if (insertError) {
      console.error('분석 결과 저장 실패:', insertError);
      return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.SUPABASE_INSERT_FAILED), {
        status: AI_ERROR_MESSAGE.SUPABASE_INSERT_FAILED.status
      });
    }
    return NextResponse.json({ result: parsedResult });
  } catch (error) {
    console.error('분석 에러:', error);
    return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.UNKNOWN), { status: AI_ERROR_MESSAGE.UNKNOWN.status });
  }
}
