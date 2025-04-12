import { FoodAnalysisResult } from '@/types/gemini.type';

export type FoodAnalysisRequestsDetailDTO = FoodAnalysisResult & {
  requestId: string;
};
