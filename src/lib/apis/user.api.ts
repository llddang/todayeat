'use server';

import { getAuth } from '@/lib/apis/auth-server.api';
import { camelToSnakeObject, snakeToCamelObject } from '@/lib/utils/camelize.util';
import { getServerClient } from '@/lib/utils/supabase/server.util';
import { UpdateUserDTO, UserDTO } from '@/types/DTO/user.dto';

/**
 *  자신의 정보를 불러오는 함수
 *
 * @returns {Promise<UserDTO>} 자신의 정보가 담긴 객체
 */
export const getUser = async (): Promise<UserDTO> => {
  const supabase = getServerClient();
  const { data, error } = await supabase.from('users').select().single();
  if (error) throw error;
  return snakeToCamelObject(data);
};

/**
 * 유저 정보를 변경하는 함수
 *
 * @param {Partial<UpdateUserDTO>} userInfo 수정할 일부 정보
 * @returns {Promise<UserDTO>} 변경 이수 수정된 값
 */
export const updateUser = async (userInfo: Partial<UpdateUserDTO>): Promise<UserDTO> => {
  const supabase = getServerClient();
  const { id: userId } = await getAuth();
  const userInfoSnakeCase = camelToSnakeObject(userInfo);
  const { data, error } = await supabase.from('users').update(userInfoSnakeCase).eq('id', userId).select().single();
  if (error) throw error;
  return snakeToCamelObject(data);
};
