export type NutrientRatio = {
  carbohydrate: { consumed: number; goal: number };
  protein: { consumed: number; goal: number };
  fat: { consumed: number; goal: number };
};

export type NutrientKey = keyof NutrientRatio;
