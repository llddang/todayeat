import { FoodAnalysisRequestsDetailDTO } from '@/types/DTO/food_analysis.dto';

export type ImageContent = {
  inlineData: {
    data: string;
    mimeType: string;
  };
};

export type FoodAnalysisResult = Omit<FoodAnalysisRequestsDetailDTO, 'requestId'>;
