'use server';

import { camelToSnakeObject, snakeToCamelObject } from '@/lib/utils/camelize.util';
import { dateDashFormatter } from '@/lib/utils/date.util';
import { getServerClient } from '@/lib/utils/supabase/server.util';
import {
  CreateMealDetailDTO,
  CreateMealDTO,
  MealDetailDTO,
  MealDetailSnakeCaseDTO,
  MealDTO,
  MealOverviewDTO,
  MealOverviewSnakeCaseDTO,
  MealSnakeCaseDTO
} from '@/types/DTO/meal.dto';

/**
 * 특정 기간 내의 사용자 식사 기록을 모든 상세 정보와 함께 조회한다.
 *
 * @param {string} startDate - 조회 시작 날짜 ex) 2023-10-15
 * @param {string} endDate - 조회 종료 날짜 ex) 2023-10-15
 * @returns {MealDTO[]} 사용자의 식사 정보 배열 (MealDTO[])
 * @throws Supabase 쿼리 실행 중 오류가 발생한 경우 Error
 */
export const getAllMyMealsByPeriod = async (startDate: string, endDate: string): Promise<MealDTO[]> => {
  const supabase = getServerClient();

  const startDateTime = `${startDate}T00:00:00Z`;
  const endDateTime = `${endDate}T23:59:59.999Z`;

  const { data, error } = await supabase
    .from('meals')
    .select(` *, meal_details (*) `)
    .gte('ate_at', startDateTime)
    .lte('ate_at', endDateTime)
    .order('ate_at', { ascending: false });
  if (error) throw error;

  return snakeToCamelObject<MealSnakeCaseDTO[]>(data);
};

/**
 * 특정 날의 사용자 식사 기록을 모든 상세 정보와 함께 조회한다.
 *
 * @param {string} date - 조회 날짜 ex) 2023-10-15
 * @returns {MealDTO[]} 사용자의 식사 정보 배열 (MealDTO[])
 * @throws Supabase 쿼리 실행 중 오류가 발생한 경우 Error
 */
export const getMyMealByDate = async (date: string): Promise<MealDTO[]> => {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from('meals')
    .select(` *, meal_details (*) `)
    .gte('ate_at', `${date}T00:00:00Z`)
    .lt('ate_at', `${date}T24:00:00Z`)
    .order('ate_at', { ascending: false });
  if (error) throw error;

  return snakeToCamelObject<MealSnakeCaseDTO[]>(data);
};

/**
 * mealId를 기준으로 사용자 식사 기록을 모든 상세 정보와 함께 조회한다.
 *
 * @param {string} mealId - 조회하려고 하는 meal ID
 * @returns {MealDTO} 사용자의 식사 정보 (MealDTO)
 * @throws Supabase 쿼리 실행 중 오류가 발생한 경우 Error
 */
export const getMyMealById = async (mealId: string): Promise<MealDTO> => {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from('meals')
    .select(` *, meal_details (*) `)
    .eq('id', mealId)
    .order('ate_at', { ascending: false })
    .single();
  if (error) throw error;

  return snakeToCamelObject<MealSnakeCaseDTO>(data);
};

/**
 * 새로운 식사 데이터를 데이터베이스에 생성합니다.
 *
 * @param {CreateMealDTO} meal - 생성할 식사 정보가 담긴 DTO 객체
 * @returns {Promise<MealOverviewDTO>} 생성된 식사 정보
 * @throws {Error} 데이터베이스 오류 발생 시 에러를 던집니다
 */
const createMeal = async (meal: CreateMealDTO): Promise<MealOverviewDTO> => {
  const supabase = getServerClient();
  const mealSnakeCase = camelToSnakeObject(meal);
  const { data, error } = await supabase.from('meals').insert(mealSnakeCase).select().single();
  if (error) throw error;
  return snakeToCamelObject<MealOverviewSnakeCaseDTO>(data);
};

/**
 * 새로운 상세 식사 데이터를 데이터베이스에 생성합니다.
 *
 * @param {string} mealId - 생성할 식사 정보와 관련된 ID
 * @param {CreateMealDetailDTO[]} mealDetails - 생성할 식사 정보가 담긴 DTO 객체
 * @returns {Promise<MealDetailDTO[]>} 생성된 상세 식사 정보
 * @throws {Error} 데이터베이스 오류 발생 시 에러를 던집니다
 */
const createMealDetails = async (mealId: string, mealDetails: CreateMealDetailDTO[]): Promise<MealDetailDTO[]> => {
  const supabase = getServerClient();
  const mealDetailsRequest = mealDetails.map((mealDetail) => ({ meal_id: mealId, ...camelToSnakeObject(mealDetail) }));
  const { data, error } = await supabase.from('meal_details').insert(mealDetailsRequest).select();
  if (error) throw error;
  return snakeToCamelObject<MealDetailSnakeCaseDTO[]>(data);
};

/**
 * 새로운 기본 식사 정보와 상세 식사 정보를 데이터베이스에 함께 생성합니다.
 *
 * @param {CreateMealDTO} mealData - 생성할 식사 정보가 담긴 객체
 * @param {CreateMealDetailDTO[]} mealDetails - 생성할 식사 정보가 담긴 DTO 객체
 * @returns {Promise<MealDTO>} 생성된 식사 정보
 * @throws {Error} 데이터베이스 오류 발생 시 에러를 던집니다
 */
export const createMealWithDetails = async (
  mealData: CreateMealDTO,
  mealDetails: CreateMealDetailDTO[]
): Promise<MealDTO> => {
  const meal = await createMeal(mealData);
  const mealDetailResponse = await createMealDetails(meal.id, mealDetails);
  return { ...meal, mealDetails: mealDetailResponse };
};

/**
 * 특정 식사 데이터를 데이터베이스에 수정합니다.
 *
 * @param {string} mealId - 수정할 식사 정보의 ID
 * @param {Partial<CreateMealDTO>} meal - 수정할 식사 정보가 담긴 DTO 객체
 * @returns {Promise<MealOverviewDTO|null>} 수정된 식사의 정보 객체 또는 수정 실패 시 null
 * @throws {Error} 데이터베이스 오류 발생 시 에러를 던집니다
 */
export const updateMeal = async (mealId: string, meal: Partial<CreateMealDTO>): Promise<MealOverviewDTO> => {
  const supabase = getServerClient();
  const mealSnakeCase = camelToSnakeObject(meal);
  const { data, error } = await supabase.from('meals').update(mealSnakeCase).eq('id', mealId).select().single();
  if (error) throw error;
  return snakeToCamelObject<MealOverviewSnakeCaseDTO>(data);
};

/**
 * 특정 식사 데이터를 데이터베이스에 삭제합니다.
 *
 * @param {string} mealId - 삭제할 식사 정보의 ID
 * @throws {Error} 데이터베이스 오류 발생 시 에러를 던집니다
 */
export const deleteMeal = async (mealId: string) => {
  const supabase = getServerClient();
  const { error } = await supabase.from('meals').delete().eq('id', mealId);
  if (error) throw error;
};

/**
 * 특정 상세 식사 데이터를 데이터베이스에서 삭제합니다.
 *
 * @param {string} mealDetailId - 삭제할 식사 상세 정보의 ID
 * @throws {Error} 데이터베이스 오류 발생 시 에러를 던집니다
 */
export const deleteMealDetail = async (mealDetailId: string) => {
  const supabase = getServerClient();
  const { error } = await supabase.from('meal_details').delete().eq('id', mealDetailId);
  if (error) throw error;
};

/**
 * 특정 기간 내의 사용자의 하루 섭취 칼로리 양 및 목표 칼로리 양을 조회합니다.
 *
 * @param {Date} startDate - 조회 시작 날짜 ex) 2023-10-15
 * @param {Date} endDate - 조회 종료 날짜 ex) 2023-10-15
 * @returns {Promise<Record<string, { calories: number; caloriesGoal: number }>>} 사용자의 식사 칼로리 양
 * @throws Supabase 쿼리 실행 중 오류가 발생한 경우 Error
 */
export const getAllMyDailyCalories = async (
  startDate: Date,
  endDate: Date
): Promise<Record<string, { calories: number; caloriesGoal: number }>> => {
  const supabase = getServerClient();

  const res: Record<string, { calories: number; caloriesGoal: number }> = {};
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  while (currentDate <= lastDate) {
    res[dateDashFormatter(currentDate)] = { calories: 0, caloriesGoal: 0 };
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const { data: userData, error: userError } = await supabase
    .from('user_personal_infos')
    .select('daily_calories_goal')
    .single();

  if (userError && userError.code === 'PGRST116') return res;
  if (userError) throw userError;

  const startDateTime = `${dateDashFormatter(startDate)}T00:00:00Z`;
  const endDateTime = `${dateDashFormatter(endDate)}T23:59:59.999Z`;

  const { data: mealData, error: mealError }: { data: MealSnakeCaseDTO[]; error: null } | { data: null; error: Error } =
    await supabase
      .from('meals')
      .select(` *, meal_details (*) `)
      .gte('ate_at', startDateTime)
      .lte('ate_at', endDateTime)
      .order('ate_at', { ascending: false });

  if (mealError) throw mealError;

  const mealCalories = mealData.reduce<Record<string, { calories: number; caloriesGoal: number }>>((acc, meal) => {
    const caloriesSum = meal.meal_details.reduce((sum, mealDetail) => sum + mealDetail.calories, 0);
    const ateAt = dateDashFormatter(new Date(meal.ate_at));
    acc[ateAt] = { calories: caloriesSum, caloriesGoal: userData.daily_calories_goal };
    return acc;
  }, res);

  return mealCalories;
};
