import { NextResponse } from 'next/server';
import { AI_ERROR_KEYS, AI_ERROR_MESSAGE, isAIErrorResponse } from '@/constants/ai-error-message.constant';
import { createFoodAnalysisRequestDetails, createAiRequest, getFoodImagesById } from '@/apis/analysis-request.api';
import { generateFoodAnalysisByImage } from '@/apis/gemini.api';
import { parseGeminiResponse } from '@/lib/gemini';
import { ImageContent } from '@/types/gemini.type';
import { uploadImage } from '@/apis/storage.api';
import { CreateAiFullResponseDTO } from '@/types/DTO/ai_analysis.dto';

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const userId = formData.get('userId')?.toString() ?? '';
    const files = formData.getAll('files') as File[];

    if (files.length > 0) {
      const uploadResults = await Promise.all(
        files.map((file) => {
          const uploadForm = new FormData();
          uploadForm.set('file', file);
          return uploadImage('meal-requests', uploadForm);
        })
      );

      const uploadedUrls: string[] = [];

      for (const result of uploadResults) {
        const { data: publicUrl, error: uploadError } = result;

        if (uploadError || !publicUrl) {
          console.error('이미지 업로드 실패:', uploadError);
          return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.UNKNOWN), {
            status: AI_ERROR_MESSAGE.UNKNOWN.status
          });
        }

        uploadedUrls.push(publicUrl);
      }

      const { error: insertTempError } = await createAiRequest(userId, uploadedUrls);

      if (insertTempError) {
        console.error('임시 테이블 저장 실패:', insertTempError);
        return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.SUPABASE_INSERT_FAILED), {
          status: AI_ERROR_MESSAGE.SUPABASE_INSERT_FAILED.status
        });
      }
    }

    const { data, error } = await getFoodImagesById(userId);

    if (error || !data?.imageUrls) {
      console.error('Supabase 에러:', error);
      return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.IMAGE_NOT_FOUND), {
        status: AI_ERROR_MESSAGE.IMAGE_NOT_FOUND.status
      });
    }

    const imageUrls: string[] = data.imageUrls;

    const base64Images: ImageContent[] = await Promise.all(imageUrls.map(convertImageUrlToBase64));

    const generatedTextResult = await generateFoodAnalysisByImage(base64Images);

    const parsedResult = parseGeminiResponse(generatedTextResult);

    if (parsedResult.length === 0) {
      console.error('유효한 이미지 없음');
      return NextResponse.json(isAIErrorResponse(AI_ERROR_KEYS.NO_VALID_FOOD_FOUND), {
        status: AI_ERROR_MESSAGE.NO_VALID_FOOD_FOUND.status
      });
    }

    const insertPayload: CreateAiFullResponseDTO[] = parsedResult.map((item) => ({
      ...item,
      userId
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
};

const convertImageUrlToBase64 = async (url: string): Promise<ImageContent> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`이미지 불러오기 실패: ${response.status} ${response.statusText}`);
    }

    const buffer: ArrayBuffer = await response.arrayBuffer();
    const mimeType = response.headers.get('content-type') || 'image/jpeg';
    return {
      inlineData: {
        data: Buffer.from(buffer).toString('base64'),
        mimeType
      }
    };
  } catch (error) {
    console.error('이미지 인코딩 실패 :', error);
    throw new Error('이미지 인코딩에 실패하였습니다.');
  }
};
