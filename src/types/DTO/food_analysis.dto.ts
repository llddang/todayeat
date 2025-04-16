export type FoodAnalysisRequestsDTO = {
  id: string;
  image_urls: string[];
};

export type FoodAnalysisRequestsDetailDTO = {
  userId: string;
  menuName: string;
  weight: number;
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
};

export type FoodAnalysisRequestDetailDTO = {
  id: string;
  userId: string;
  menuName: string;
  weight: number;
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
};

export type CreateFoodAnalysisRequestDetailDTO = Pick<FoodAnalysisRequestDetailDTO, 'menuName' | 'weight'>;
