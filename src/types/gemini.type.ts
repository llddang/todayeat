export type ImageContent = {
  inlineData: {
    data: string;
    mimeType: string;
  };
};

export type FoodAnalysisResult = {
  menuName: string;
  weight: number;
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
};
