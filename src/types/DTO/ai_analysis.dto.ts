export type AiRequestDTO = {
  id: string;
  createdAt: string;
  imageUrls: string[];
  userId: string;
};

export type AiResponseDTO = {
  id: string;
  userId: string;
  menuName: string;
  weight: number;
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
};

export type CreateAiFullResponseDTO = Omit<AiResponseDTO, 'id'>;
export type CreateAiPartialResponseDTO = Pick<AiResponseDTO, 'menuName' | 'weight'>;
