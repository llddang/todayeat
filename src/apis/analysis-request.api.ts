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

/**
 * 사용자 ID로 ai_requests 테이블에서 이미지 URL 데이터를 조회합니다.
 *
 * @param {string} userId - 조회할 사용자 ID
 * @returns {Promise<{ data: AiRequestDTO | null; error: PostgrestError | null }>} 조회 결과와 에러
 */
export const getFoodImagesById = async (
  userId: string
): Promise<{ data: AiRequestDTO | null; error: PostgrestError | null }> => {
  const supabase = getServerClient();

  const { data, error } = await supabase.from('ai_requests').select().eq('user_id', userId).single();

  return { data: snakeToCamelObject(data), error };
};

/**
 * 사용자 ID와 이미지 URL 리스트를 ai_requests 테이블에 upsert합니다.
 *
 * @param {string} userId - 사용자 ID
 * @param {string[]} imageUrls - 업로드할 이미지 URL 배열
 * @returns {Promise<{ error: PostgrestError | null }>} 실행 결과 에러
 */
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

/**
 * 현재 로그인한 유저의 ID로 빈 ai_requests 레코드를 생성합니다.
 *
 * @returns {Promise<{ error: PostgrestError | null }>} 실행 결과 에러
 */
export const createAiRequestByText = async () => {
  const supabase = getServerClient();
  const { id } = await getUser();

  const { error } = await supabase.from('ai_requests').upsert({
    user_id: id
  });

  return { error };
};

/**
 * 현재 로그인한 유저의 ai_responses 테이블 데이터를 조회합니다.
 *
 * @returns {Promise<AiResponseDTO[]>} 조회된 분석 결과 목록
 * @throws {PostgrestError} 데이터 조회 실패 시 에러를 던집니다
 */
export const getAiResponses = async (): Promise<AiResponseDTO[]> => {
  const supabase = getServerClient();
  const { id } = await getAuth();
  if (!id) return [];
  const { data, error } = await supabase.from('ai_responses').select('*').eq('user_id', id);
  if (error) throw error;
  return snakeToCamelObject(data);
};

/**
 * 분석된 식사 데이터를 ai_responses 테이블에 일괄 저장합니다.
 *
 * @param {CreateAiFullResponseDTO[]} insertPayload - 저장할 데이터 목록
 * @returns {Promise<{ error: PostgrestError | null }>} 실행 결과 에러
 */
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

/**
 * 하나의 분석 결과를 ai_responses 테이블에 저장하고, 저장된 데이터를 반환합니다.
 *
 * @param {CreateAiPartialResponseDTO} food - 저장할 식사 데이터
 * @returns {Promise<AiResponseDTO>} 저장된 데이터
 * @throws {PostgrestError} 저장 실패 시 에러를 던집니다
 */
export const createAiResponse = async (food: CreateAiPartialResponseDTO): Promise<AiResponseDTO> => {
  const supabase = getServerClient();

  const { data, error } = await supabase.from('ai_responses').insert(camelToSnakeObject(food)).select().single();

  if (error) throw error;

  return snakeToCamelObject(data);
};

/**
 * 기존 분석 결과를 수정하여 ai_responses 테이블에 업데이트합니다.
 *
 * @param {AiResponseDTO} food - 수정할 데이터
 * @returns {Promise<{ error: PostgrestError | null }>} 실행 결과 에러
 */
export const updateCaloriesAnalysisResult = async (food: AiResponseDTO): Promise<{ error: PostgrestError | null }> => {
  const supabase = getServerClient();
  const { id } = food;
  const { error } = await supabase.from('ai_responses').update(camelToSnakeObject(food)).eq('id', id);

  return { error };
};

/**
 * 분석시 저장한 상세 식사 데이터를 데이터베이스에서 삭제합니다.
 *
 * @param {string}  id 로그인한 유저 id
 * @throws {Error} 데이터베이스 오류 발생 시 에러를 던집니다
 */
export const deleteAnalysisData = async () => {
  const supabase = getServerClient();
  const { id } = await getUser();
  const { error: requestsError } = await supabase.from('ai_requests').delete().eq('user_id', id);
  const { error: requestsDetailError } = await supabase.from('ai_responses').delete().eq('user_id', id);
  if (requestsDetailError || requestsError) throw new Error('등록된 식사정보 삭제에 실패하였습니다. ');
};
