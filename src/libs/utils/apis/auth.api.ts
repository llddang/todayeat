'use server';

import { getServerClient } from '@/libs/utils/supabase/server.util';
import { SupabaseAuthDTO, UserAuthDTO } from '@/types/DTO/user.dto';

/**
 * 사용자의 정보를 받아 회원가입하는 함수
 * @param {string} email 사용자의 이메일
 * @param {string} password 사용자의 비밀번호
 * @param {string} name 사용자의 이름
 * @throws {AuthError} : supabase에서 전송하는 에러
 * @returns {SupabaseAuthDto} 슈퍼베이스의 유저, 세션 정보
 */
export const signUp = async (email: string, password: string, name: string): Promise<SupabaseAuthDTO> => {
  const supabase = getServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });
  if (error) throw error;
  return data;
};

/**
 * 사용자의 정보를 받아 로그인하는 함수
 * @param {string} email 사용자의 이메일
 * @param {string} password 사용자의 비밀번호
 * @throws {AuthError} supabase에서 전송하는 에러
 * @returns {SupabaseAuthDTO} 슈퍼베이스의 유저, 세션 정보
 */
export const signIn = async (email: string, password: string): Promise<SupabaseAuthDTO> => {
  const supabase = getServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

/**
 * 로그아웃하는 함수
 * @throws {AuthError} supabase에서 전송하는 에러
 */
export const signOut = async () => {
  const supabase = getServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

/**
 * 인가된 유저의 정보를 가져오는 함수
 * @throws {AuthError} supabase에서 전송하는 에러
 * @returns {UserAuthDTO} 슈퍼베이스의 유저, 세션 정보
 */
export const getAuth = async (): Promise<UserAuthDTO> => {
  const supabase = getServerClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;

  const id = data.session?.user.id || '';
  const email = data.session?.user.email || '';

  return { id, email, isAuthenticated: !!id };
};
