import { camelToSnakeObject } from '@/lib/utils/camelize.util';
import { getServerClient } from '@/lib/utils/supabase/server.util';
import { FoodAnalysisRequestsDetailDTO, FoodAnalysisRequestsDTO } from '@/types/DTO/food_analysis.dto';
import { PostgrestError } from '@supabase/supabase-js';

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

export const createFoodAnalysisResult = async (
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

export const createFoodImageUrls = async (
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
