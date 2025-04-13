import { NextResponse } from 'next/server';
import { AI_ERROR_KEYS, AI_ERROR_MESSAGE, isAIErrorResponse } from '@/constants/ai-error-message.constant';
import {
  createFoodAnalysisRequestDetails,
  createFoodAnalysisRequests,
  getFoodImagesById
} from '@/lib/apis/analysis-request.api';
import { generateFoodAnalysisByImage } from '@/lib/apis/gemini.api';
import { convertImageUrlToBase64 } from '@/lib/utils/convert-image-to-base64.util';
import { parseGeminiResponse } from '@/lib/utils/gemini.util';
import { FoodAnalysisRequestsDetailDTO } from '@/types/DTO/food_analysis.dto';
import { FoodAnalysisResult, ImageContent } from '@/types/gemini.type';
import { uploadImage } from '@/lib/apis/storage.api';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const userId = formData.get('userId')?.toString() as string;
    const files = formData.getAll('files') as File[];

    const uploadedUrls: string[] = [];

    if (files.length > 0) {
      for (const file of files) {
        const uploadForm = new FormData();
        uploadForm.set('file', file);

        const { data: publicUrl, error: uploadError } = await uploadImage('meal-requests', uploadForm);

        if (uploadError || !publicUrl) {
          console.error('이미지 업로드 실패:', uploadError);
          return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.UNKNOWN), {
            status: AI_ERROR_MESSAGE.UNKNOWN.status
          });
        }

        uploadedUrls.push(publicUrl);
      }

      const { error: insertTempError } = await createFoodAnalysisRequests(userId, uploadedUrls);

      if (insertTempError) {
        console.error('임시 테이블 저장 실패:', insertTempError);
        return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.SUPABASE_INSERT_FAILED), {
          status: AI_ERROR_MESSAGE.SUPABASE_INSERT_FAILED.status
        });
      }
    }

    const { data, error } = await getFoodImagesById(userId);

    if (error || !data?.image_urls) {
      console.error('Supabase 에러:', error);
      return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.IMAGE_NOT_FOUND), {
        status: AI_ERROR_MESSAGE.IMAGE_NOT_FOUND.status
      });
    }

    const requestId: string = data.id;
    const imageUrls: string[] = data.image_urls;

    const base64Images: ImageContent[] = await Promise.all(imageUrls.map(convertImageUrlToBase64));

    const generatedTextResult = await generateFoodAnalysisByImage(base64Images);

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

    const { error: insertError } = await createFoodAnalysisRequestDetails(insertPayload);

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
