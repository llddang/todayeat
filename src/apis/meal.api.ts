'use server';

import { camelToSnake, snakeToCamel } from '@/utils/camelize.util';
import { formatDateWithDash } from '@/utils/format.util';
import { getServerClient } from '@/lib/supabase/server';
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
import { endOfMonth, startOfMonth } from 'date-fns';
import { DailyMealCalories } from '@/types/nutrition.type';
import { convertDateToKoreaTime, getDateTimeRange } from '@/utils/date.util';

/**
 * 특정 기간 내의 사용자 식사 기록을 모든 상세 정보와 함께 조회한다.
 *
 * @param {Date} startDate - 조회 시작 날짜
 * @param {Date} endDate - 조회 종료 날짜
 * @returns {MealDTO[]} 사용자의 식사 정보 배열 (MealDTO[])
 * @throws Supabase 쿼리 실행 중 오류가 발생한 경우 Error
 */
export const getAllMyMealsByPeriod = async (startDate: Date, endDate: Date): Promise<MealDTO[]> => {
  const supabase = getServerClient();

  const { start, end } = getDateTimeRange(startDate, endDate);

  const { data, error } = await supabase
    .from('meals')
    .select(` *, meal_details (*) `)
    .gte('ate_at', start.toISOString())
    .lte('ate_at', end.toISOString())
    .order('ate_at', { ascending: false });
  if (error) throw error;

  return snakeToCamel<MealSnakeCaseDTO[]>(data);
};

/**
 * 특정 날의 사용자 식사 기록을 모든 상세 정보와 함께 조회한다.
 *
 * @param {Date} date - 조회 날짜
 * @returns {MealDTO[]} 사용자의 식사 정보 배열 (MealDTO[])
 * @throws Supabase 쿼리 실행 중 오류가 발생한 경우 Error
 */
export const getMyMealByDate = async (date: Date): Promise<MealDTO[]> => {
  const supabase = getServerClient();

  const { start, end } = getDateTimeRange(date, date);

  const { data, error } = await supabase
    .from('meals')
    .select(`*, meal_details(*)`)
    .gte('ate_at', start.toISOString())
    .lte('ate_at', end.toISOString())
    .order('ate_at', { ascending: true });

  if (error) throw error;

  return snakeToCamel<MealSnakeCaseDTO[]>(data);
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

  return snakeToCamel<MealSnakeCaseDTO>(data);
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
  const mealSnakeCase = camelToSnake(meal);
  const { data, error } = await supabase.from('meals').insert(mealSnakeCase).select().single();
  if (error) throw error;
  return snakeToCamel<MealOverviewSnakeCaseDTO>(data);
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
  const mealDetailsRequest = mealDetails.map((mealDetail) => ({ meal_id: mealId, ...camelToSnake(mealDetail) }));
  const { data, error } = await supabase.from('meal_details').insert(mealDetailsRequest).select();
  if (error) throw error;
  return snakeToCamel<MealDetailSnakeCaseDTO[]>(data);
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
  const mealSnakeCase = camelToSnake(meal);
  const { data, error } = await supabase.from('meals').update(mealSnakeCase).eq('id', mealId).select().single();
  if (error) throw error;
  return snakeToCamel<MealOverviewSnakeCaseDTO>(data);
};

/**
 * 특정 식사 데이터를 데이터베이스에 삭제합니다.
 *
 * @param {string[]} mealIds - 삭제할 식사 정보의 ID
 * @throws {Error} 데이터베이스 오류 발생 시 에러를 던집니다
 */
export const deleteMeals = async (mealIds: string[]) => {
  if (mealIds.length === 0) return;

  const supabase = getServerClient();
  const { error } = await supabase.from('meals').delete().in('id', mealIds);
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
export const getAllMyDailyCalories = async (startDate: Date, endDate: Date): Promise<DailyMealCalories> => {
  const supabase = getServerClient();

  const { start, end } = getDateTimeRange(startDate, endDate);

  const { data: mealData, error: mealError }: { data: MealSnakeCaseDTO[]; error: null } | { data: null; error: Error } =
    await supabase
      .from('meals')
      .select(`*, meal_details (*)`)
      .gte('ate_at', start.toISOString())
      .lte('ate_at', end.toISOString())
      .order('ate_at', { ascending: false });

  if (mealError) throw mealError;

  const initialValue = initializeMyDailyCalories(start, end);
  const mealCalories = mealData.reduce<DailyMealCalories>((acc, meal) => {
    const caloriesSum = meal.meal_details.reduce((sum, mealDetail) => sum + mealDetail.calories, 0);
    const ateAt = formatDateWithDash(convertDateToKoreaTime(new Date(meal.ate_at)));
    acc[ateAt] += caloriesSum;
    return acc;
  }, initialValue);

  return mealCalories;
};

/**
 * 자신의 식사 기록 갯수를 가져오는 API 함수
 *
 * @returns {Promise<number>}  기록한 식사의 갯수
 * @throws {Error} Supabase 요청 중 오류 발생 시 예러를 던집니다.
 */
export const getMyMealsCount = async (): Promise<number> => {
  const supabase = getServerClient();

  const { count, error } = await supabase.from('meals').select('*', { count: 'exact', head: true });
  if (error) throw error;

  return count || 0;
};

/**
 * 인자로 넘어온 달의 기록 갯수를 반환하는 함수
 *
 * @param {Date} date 조회하려는 달의 날짜
 * @returns {Promise<number>}  해당 달의 기록한 일 수
 * @throws {Error} Supabase 요청 중 오류 발생 시 예러를 던집니다.
 */
export const getMyMealCountByMonth = async (date: Date): Promise<number> => {
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);

  const { start, end } = getDateTimeRange(startDate, endDate);
  const supabase = getServerClient();

  const { data, error } = await supabase.rpc('count_unique_meal_dates', {
    start_date: start.toISOString(),
    end_date: end.toISOString()
  });

  if (error) throw error;
  return data || 0;
};

/**
 * 지정된 날짜 범위에 대한 DailyMealCalories 초기값을 생성합니다.
 * 시작 날짜부터 종료 날짜까지의 모든 날짜를 키로 갖고, 값은 0으로 설정된 객체를 반환합니다.
 *
 * @param {Date} start - 시작 날짜
 * @param {Date} end - 종료 날짜
 * @returns {DailyMealCalories} 날짜를 키로 하고 칼로리 값(0)을 갖는 객체
 */
const initializeMyDailyCalories = (start: Date, end: Date): DailyMealCalories => {
  const result: DailyMealCalories = {};
  const currentDate = new Date(start);

  while (currentDate <= end) {
    result[formatDateWithDash(currentDate)] = 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
};
