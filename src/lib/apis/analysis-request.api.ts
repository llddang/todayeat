'use server';
import { camelToSnakeObject, snakeToCamelObject } from '@/lib/utils/camelize.util';
import { getServerClient } from '@/lib/utils/supabase/server.util';
import {
  CreateFoodAnalysisRequestDetailDTO,
  FoodAnalysisRequestDetailDTO,
  FoodAnalysisRequestsDetailDTO,
  FoodAnalysisRequestsDetailSnakeCaseDTO,
  FoodAnalysisRequestsDTO
} from '@/types/DTO/food_analysis.dto';
import { CaloriesAnalysisUpdatePayload } from '@/types/gemini.type';
import { PostgrestError } from '@supabase/supabase-js';
import { getUser } from './user.api';

export const getFoodImagesById = async (
  userId: string
): Promise<{ data: FoodAnalysisRequestsDTO | null; error: PostgrestError | null }> => {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from('food_analysis_requests')
    .select('id, image_urls')
    .eq('user_id', userId)
    .single();

  return { data, error };
};

export const getFoodAnalysisDetail = async (): Promise<FoodAnalysisRequestsDetailDTO[]> => {
  const supabase = getServerClient();
  const { id } = await getUser();
  const { data, error } = await supabase.from('food_analysis_requests_detail').select('*').eq('user_id', id);
  if (error) throw error;
  return snakeToCamelObject<FoodAnalysisRequestsDetailSnakeCaseDTO[]>(data);
};

export const createFoodAnalysisRequestDetails = async (
  insertPayload: FoodAnalysisRequestsDetailDTO[]
): Promise<{
  error: PostgrestError | null;
}> => {
  const supabase = getServerClient();

  const { error } = await supabase
    .from('food_analysis_requests_detail')
    .insert(camelToSnakeObject<FoodAnalysisRequestsDetailDTO[]>(insertPayload));

  return { error };
};

export const createFoodAnalysisRequestDetail = async (
  food: CreateFoodAnalysisRequestDetailDTO
): Promise<FoodAnalysisRequestDetailDTO> => {
  const supabase = getServerClient();

  const foodSnakeCase = camelToSnakeObject(food);

  const { data, error } = await supabase.from('food_analysis_requests_detail').insert(foodSnakeCase).select().single();

  if (error) throw error;

  return data;
};

export const createFoodAnalysisRequests = async (
  userId: string,
  imageUrls: string[]
): Promise<{
  error: PostgrestError | null;
}> => {
  const supabase = getServerClient();

  const { error } = await supabase
    .from('food_analysis_requests')
    .upsert({
      user_id: userId,
      image_urls: imageUrls
    })
    .eq('user_id', userId);

  return { error };
};

export const updateCaloriesAnalysisResult = async ({
  id,
  userId,
  menuName,
  weight,
  calories,
  carbohydrate,
  protein,
  fat
}: CaloriesAnalysisUpdatePayload): Promise<{ error: PostgrestError | null }> => {
  const supabase = getServerClient();

  const { error } = await supabase
    .from('food_analysis_requests_detail')
    .update({
      user_id: userId,
      menu_name: menuName,
      weight,
      calories,
      carbohydrate,
      protein,
      fat
    })
    .eq('id', id);

  return { error };
};
