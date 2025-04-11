import { SnakeCaseObject } from '@/types/common.type';
import { FoodAnalysisResult } from '@/types/gemini.type';

export type FoodAnalysisRequestsDetailDTO = FoodAnalysisResult & {
  requestId: string;
};

export type FoodAnalysisRequestsDetailSnakeCaseDTO = SnakeCaseObject<FoodAnalysisRequestsDetailDTO>;
