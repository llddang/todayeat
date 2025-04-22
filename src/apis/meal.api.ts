'use server';

import { camelToSnakeObject, snakeToCamelObject } from '@/utils/camelize.util';
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
import { getUser } from './user.api';
import { endOfMonth, startOfMonth } from 'date-fns';

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
    .order('ate_at', { ascending: true });
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

// TODO: deleteMealAnalysisDetail 함수 analysis-request.api.ts로 위치 이동 & 함수 주석 수정
/**
 * 분석시 저장한 상세 식사 데이터를 데이터베이스에서 삭제합니다.
 *
 * @param {string}  id 로그인한 유저 id
 * @throws {Error} 데이터베이스 오류 발생 시 에러를 던집니다
 */
export const deleteMealAnalysisDetail = async () => {
  const supabase = getServerClient();
  const { id } = await getUser();
  const { error: requestsError } = await supabase.from('ai_requests').delete().eq('user_id', id);
  const { error: requestsDetailError } = await supabase.from('ai_responses').delete().eq('user_id', id);
  if (requestsDetailError || requestsError) throw new Error('등록된 식사정보 삭제에 실패하였습니다. ');
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
    res[formatDateWithDash(currentDate)] = { calories: 0, caloriesGoal: 0 };
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const { data: userData, error: userError } = await supabase
    .from('user_personal_infos')
    .select('daily_calories_goal')
    .single();

  if (userError && userError.code === 'PGRST116') return res;
  if (userError) throw userError;

  const startDateTime = `${formatDateWithDash(startDate)}T00:00:00Z`;
  const endDateTime = `${formatDateWithDash(endDate)}T23:59:59.999Z`;

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
    const ateAt = formatDateWithDash(new Date(meal.ate_at));
    acc[ateAt].calories += caloriesSum;
    acc[ateAt].caloriesGoal = userData.daily_calories_goal;
    return acc;
  }, res);

  return mealCalories;
};

// TODO: createFoodAnalysisRequestDetail 함수 analysis-request.api.ts로 위치 이동
/**
 * 임시식사의 상세 항목을 데이터베이스에 추가합니다.
 *
 * @param {Partial<Pick<MealDetailDTO, 'calories' | 'menuName' | 'weight'>>} meal 삽입할 식단 상세 정보 (일부 필드만 포함 가능).
 * @returns {Promise<MealDetailSnakeCaseDTO>}  생성된 식사 상세 정보
 * @throws {Error} Supabase 요청 중 오류 발생 시 예러를 던집니다.
 */
export const createFoodAnalysisRequestDetail = async (
  meal: Partial<Pick<MealDetailDTO, 'calories' | 'menuName' | 'weight'>>
): Promise<MealDetailDTO> => {
  const supabase = getServerClient();
  const mealDetailRequest = camelToSnakeObject(meal);
  const { data, error } = await supabase.from('ai_responses').insert(mealDetailRequest).select().single();
  if (error) throw error;
  return snakeToCamelObject<MealDetailSnakeCaseDTO>(data);
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
  const supabase = getServerClient();

  const { data, error } = await supabase.rpc('count_unique_meal_dates', {
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString()
  });

  if (error) throw error;
  return data || 0;
};
