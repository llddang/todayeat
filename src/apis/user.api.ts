'use server';

import { getAuth } from '@/apis/auth-server.api';
import { camelToSnakeObject, snakeToCamelObject } from '@/utils/camelize.util';
import { getServerClient } from '@/lib/supabase/server';
import { UpdateUserDTO, UpdateUserPersonalInfoDTO, UserDTO, UserPersonalInfoDTO } from '@/types/DTO/user.dto';

/**
 *  자신의 정보를 불러오는 함수
 *
 * @returns {Promise<UserDTO>} 자신의 정보가 담긴 객체
 */
export const getUser = async (): Promise<UserDTO> => {
  const supabase = getServerClient();
  const { data, error } = await supabase.from('users').select('*, user_personal_infos!user_id(*)').single();

  if (error) throw error;

  const { user_personal_infos, ...userAuthInfo } = data;

  return {
    ...snakeToCamelObject(userAuthInfo),
    personalInfo: user_personal_infos ? snakeToCamelObject(user_personal_infos) : null
  };
};

/**
 * 유저 정보를 변경하는 함수
 *
 * @param {Partial<UpdateUserDTO>} userInfo 수정할 일부 정보
 * @returns {Promise<UserDTO>} 변경 이후 수정된 값
 */
export const updateUser = async (userInfo: Partial<UpdateUserDTO>): Promise<UserDTO> => {
  const supabase = getServerClient();
  const { id: userId } = await getAuth();
  const userInfoSnakeCase = camelToSnakeObject(userInfo);
  const { data, error } = await supabase.from('users').update(userInfoSnakeCase).eq('id', userId).select().single();
  if (error) throw error;
  return snakeToCamelObject(data);
};

export const updateUserPersonalInfo = async (
  userPersonalInfo: UpdateUserPersonalInfoDTO
): Promise<UserPersonalInfoDTO> => {
  const supabase = getServerClient();
  const { id: userId } = await getAuth();

  const userPersonalInfoSnakeCase = {
    ...camelToSnakeObject(userPersonalInfo),
    user_id: userId
  };

  const { data, error } = await supabase
    .from('user_personal_infos')
    .upsert(userPersonalInfoSnakeCase)
    .select()
    .single();

  if (error) throw error;
  return snakeToCamelObject(data);
};
