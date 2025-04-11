import { ImageContent } from '@/types/gemini.type';
import { create } from 'zustand';

type MealImagesStore = {
  mealImages: File[] | null;
  encodedMealImages: ImageContent[];
  setMealImages: (files: NonNullable<MealImagesStore['mealImages']>) => void;
  setEncodedMealImages: (encodedFiles: ImageContent[]) => void;
};

const mealImagesInitialValue = {
  mealImages: null,
  encodedMealImages: [
    {
      inlineData: {
        data: '',
        mimeType: ''
      }
    }
  ]
};

const useMealImagesStore = create<MealImagesStore>()((set) => ({
  ...mealImagesInitialValue,
  setMealImages: (mealImages) => set((state) => ({ ...state, mealImages })),
  setEncodedMealImages: (encodedMealImages) => set((state) => ({ ...state, encodedMealImages }))
}));

export default useMealImagesStore;
