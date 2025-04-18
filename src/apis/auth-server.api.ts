'use server';

import { User } from '@supabase/supabase-js';
import { getServerClient } from '@/lib/supabase/server';
import { ENV } from '@/constants/env.constant';
import SITE_MAP from '@/constants/site-map.constant';
import { SupabaseAuthDTO, UserAuthDTO } from '@/types/DTO/user.dto';
import { categoriesError, ErrorResponse } from '@/types/error.type';

/**
 * 사용자의 정보를 받아 회원가입하는 함수
 * @param {string} email 사용자의 이메일
 * @param {string} password 사용자의 비밀번호
 * @param {string} nickname 사용자의 이름
 * @throws {AuthError} : supabase에서 전송하는 에러
 * @returns {SupabaseAuthDto} 슈퍼베이스의 유저, 세션 정보
 */
export const signUp = async (
  email: string,
  password: string,
  nickname: string
): Promise<ErrorResponse<SupabaseAuthDTO>> => {
  const supabase = getServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname }
    }
  });
  if (error) return { data: null, error: categoriesError(error) };
  return { data, error };
};

/**
 * 사용자의 정보를 받아 로그인하는 함수
 * @param {string} email 사용자의 이메일
 * @param {string} password 사용자의 비밀번호
 * @throws {AuthError} supabase에서 전송하는 에러
 * @returns {SupabaseAuthDTO} 슈퍼베이스의 유저, 세션 정보
 */
export const signIn = async (email: string, password: string): Promise<ErrorResponse<SupabaseAuthDTO>> => {
  const supabase = getServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { data: null, error: categoriesError(error) };
  return { data, error };
};

/**
 * 로그아웃하는 함수
 * @throws {AuthError} supabase에서 전송하는 에러
 */
export const signOut = async () => {
  const supabase = getServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) categoriesError(error);
};

/**
 * 중복되는 이메일이 있는지 확인하는 함수
 * @param {string} email 검증할 사용자의 이메일
 * @throws {PostgrestError} supabase에서 전송하는 에러
 * @returns {boolean} 존재하면 true, 존재하지 않으면 false 반환
 */
export const checkEmailExists = async (email: string): Promise<ErrorResponse<boolean>> => {
  const supabase = getServerClient();
  const { data, error } = await supabase.from('users').select('email').eq('email', email).single();

  if (error && error.code !== 'PGRST116') return { data: null, error: categoriesError(error) };
  return { data: !!data, error: null };
};

/**
 * 기존의 비밀번호를 새로운 비밀번호로 변경하는 함수
 * @param {string} newPassword 새로운 비밀번호
 * @throws {AuthError} supabase에서 전송하는 에러
 * @returns {User} 존재하면 true, 존재하지 않으면 false 반환
 */
export const changePassword = async (newPassword: string): Promise<ErrorResponse<User>> => {
  const supabase = getServerClient();
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  if (error) return { data: null, error: categoriesError(error) };
  return { data: data.user, error: null };
};

/**
 * 이메일을 통해서 비밀번호를 재설정하는 함수
 * @param {string} email 비밀번호를 받을 이메일
 * @returns {Promise<ErrorResponse<Record<string, never>>>}
 */
export const resetPasswordByEmail = async (email: string): Promise<ErrorResponse<Record<string, never>>> => {
  const supabase = getServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${ENV.PROJECT_URL}/${SITE_MAP.UPDATE_PASSWORD}`
  });
  if (error) return { data: null, error: categoriesError(error) };
  return { data: {}, error };
};

/**
 * 인가된 유저의 정보를 가져오는 함수
 * @throws {AuthError} supabase에서 전송하는 에러
 * @returns {UserAuthDTO} 슈퍼베이스의 유저, 세션 정보
 */
export const getAuth = async (): Promise<UserAuthDTO> => {
  const supabase = getServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error && error.code === 'refresh_token_not_found') {
    signOut();
    return { id: '', email: '', isAuthenticated: false };
  }
  if (error && error.message === 'Auth session missing!') {
    return { id: '', email: '', isAuthenticated: false };
  }
  if (error) {
    categoriesError(error);
    return { id: '', email: '', isAuthenticated: false };
  }

  const id = data.user.id || '';
  const email = data.user.email || '';

  return { id, email, isAuthenticated: !!id };
};
