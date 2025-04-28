'use server';
import { camelToSnakeObject, snakeToCamelObject } from '@/utils/camelize.util';
import { getServerClient } from '@/lib/supabase/server';
import {
  AiRequestDTO,
  AiResponseDTO,
  CreateAiFullResponseDTO,
  CreateAiPartialResponseDTO
} from '@/types/DTO/ai_analysis.dto';
import { PostgrestError } from '@supabase/supabase-js';
import { getAuth } from '@/apis/auth-server.api';
import { getUser } from './user.api';

export const getFoodImagesById = async (
  userId: string
): Promise<{ data: AiRequestDTO | null; error: PostgrestError | null }> => {
  const supabase = getServerClient();

  const { data, error } = await supabase.from('ai_requests').select().eq('user_id', userId).single();

  return { data: snakeToCamelObject(data), error };
};

export const createAiRequest = async (
  userId: string,
  imageUrls: string[]
): Promise<{
  error: PostgrestError | null;
}> => {
  const supabase = getServerClient();

  const { error } = await supabase
    .from('ai_requests')
    .upsert({
      user_id: userId,
      image_urls: imageUrls
    })
    .eq('user_id', userId);

  return { error };
};

export const createAiRequestByText = async () => {
  const supabase = getServerClient();
  const { id } = await getUser();

  const { error } = await supabase.from('ai_requests').upsert({
    user_id: id
  });

  return { error };
};
export const getAiResponses = async (): Promise<AiResponseDTO[]> => {
  const supabase = getServerClient();
  const { id } = await getAuth();
  if (!id) return [];
  const { data, error } = await supabase.from('ai_responses').select('*').eq('user_id', id);
  if (error) throw error;
  return snakeToCamelObject(data);
};

export const createAiResponses = async (
  insertPayload: CreateAiFullResponseDTO[]
): Promise<{
  error: PostgrestError | null;
}> => {
  const supabase = getServerClient();

  const { error } = await supabase
    .from('ai_responses')
    .insert(camelToSnakeObject<CreateAiFullResponseDTO[]>(insertPayload));

  return { error };
};

export const createAiResponse = async (food: CreateAiPartialResponseDTO): Promise<AiResponseDTO> => {
  const supabase = getServerClient();

  const { data, error } = await supabase.from('ai_responses').insert(camelToSnakeObject(food)).select().single();

  if (error) throw error;

  return snakeToCamelObject(data);
};

export const updateCaloriesAnalysisResult = async (food: AiResponseDTO): Promise<{ error: PostgrestError | null }> => {
  const supabase = getServerClient();
  const { id } = food;
  const { error } = await supabase.from('ai_responses').update(camelToSnakeObject(food)).eq('id', id);

  return { error };
};
