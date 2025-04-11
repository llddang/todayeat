import { camelToSnakeObject } from '@/lib/utils/camelize.util';
import { getServerClient } from '@/lib/utils/supabase/server.util';
import { FoodAnalysisResult } from '@/types/gemini.type';

export async function getFoodImagesById(userId: string) {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from('food_analysis_requests')
    .select('id, image_urls')
    .eq('user_id', userId)
    .single();

  return { data, error };
}

export async function saveFoodAnalysisResult(requestId: string, result: FoodAnalysisResult[]) {
  const supabase = getServerClient();
  const insertPayload = result.map((item) => ({
    ...item,
    requestId
  }));

  return await supabase.from('food_analysis_requests_detail').insert(camelToSnakeObject(insertPayload));
}
