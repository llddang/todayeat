import { describe, it, expect } from '@jest/globals';
import {
  calculateBMR,
  calculateDailyCalories,
  calculateDailyNutrition,
  calculateDailyNutritionGoal,
  calculateMacroCaloriesByGram,
  calculateNutritionAverage,
  calculateNutritionRatio,
  calculateTotalNutrition,
  countUniqueDates,
  getPercentage
} from '@/utils/nutrition-calculator.util';
import {
  bmrFixtures,
  dailyNutritionFixture,
  dailyCaloriesFixture,
  dailyNutritionGoalFixture,
  totalNutritionFixture,
  uniqueDatesFixture,
  nutritionAverageFixtures,
  percentageFixtures,
  nutritionRatioFixtures,
  macroCaloriesFixture
} from '../fixtures/nutrition-calculator.fixture';

describe('nutrition-calculator.util', () => {
  describe('calculateBMR', () => {
    it('남성의 기초 대사량을 계산해야 합니다', () => {
      const { weight, height, age, gender, expectedBmr } = bmrFixtures.manFixture;
      const bmr = calculateBMR(weight, height, age, gender);
      expect(bmr).toBe(expectedBmr);
    });

    it('여성의 기초 대사량을 계산해야 합니다', () => {
      const { weight, height, age, gender, expectedBmr } = bmrFixtures.womanFixture;
      const bmr = calculateBMR(weight, height, age, gender);
      expect(bmr).toBe(expectedBmr);
    });

    it('나이에 따른 기초 대사량 변화를 확인해야 합니다', () => {
      const { weight, height, age, gender, expectedBmr } = bmrFixtures.olderManFixture;
      const bmr = calculateBMR(weight, height, age, gender);
      expect(bmr).toBe(expectedBmr);
    });
  });

  describe('calculateDailyNutrition', () => {
    it('일일 영양소를 계산해야 합니다', () => {
      const { calories, ratio, expected } = dailyNutritionFixture;
      const dailyNutrition = calculateDailyNutrition(calories, ratio);
      expect(dailyNutrition).toEqual(expected);
    });
  });

  describe('calculateDailyCalories', () => {
    it('일일 칼로리를 계산해야 합니다', () => {
      const { bmr, activityMultiplier, purposeMultiplier, expectedCalories } = dailyCaloriesFixture;
      const dailyCalories = calculateDailyCalories(bmr, activityMultiplier, purposeMultiplier);
      expect(dailyCalories).toBe(expectedCalories);
    });
  });

  describe('calculateDailyNutritionGoal', () => {
    it('일일 영양소를 계산해야 합니다', () => {
      const { userInfo, expected } = dailyNutritionGoalFixture;
      const dailyNutritionGoal = calculateDailyNutritionGoal(userInfo);
      expect(dailyNutritionGoal).toEqual(expected);
    });
  });

  describe('calculateTotalNutrition', () => {
    it('총 영양소를 계산해야 합니다', () => {
      const { meals, expected } = totalNutritionFixture;
      const totalNutrition = calculateTotalNutrition(meals);
      expect(totalNutrition).toEqual(expected);
    });
  });

  describe('countUniqueDates', () => {
    it('고유한 날짜 수를 계산해야 합니다', () => {
      const { meals, expectedCount } = uniqueDatesFixture;
      const uniqueDates = countUniqueDates(meals);
      expect(uniqueDates).toBe(expectedCount);
    });
  });

  describe('calculateNutritionAverage', () => {
    it('식사 정보가 없는 경우 모든 영양소가 0이어야 합니다', () => {
      const { emptyMealDetails, expectedAverageEmpty } = nutritionAverageFixtures;
      const nutritionAverage = calculateNutritionAverage(emptyMealDetails);
      expect(nutritionAverage).toEqual(expectedAverageEmpty);
    });

    it('여러 날짜의 평균 영양소를 계산해야 합니다', () => {
      const { multiDayMeals, expectedAverageMultiDay } = nutritionAverageFixtures;
      const nutritionAverage = calculateNutritionAverage(multiDayMeals);
      expect(nutritionAverage).toEqual(expectedAverageMultiDay);
    });
  });

  describe('getPercentage', () => {
    it('기준값이 0인 경우 0%를 반환해야 합니다', () => {
      const { value, base, expected } = percentageFixtures.zeroBase;
      const percentage = getPercentage(value, base);
      expect(percentage).toBe(expected);
    });

    it('기준값이 0이 아닌 경우 백분율을 계산해야 합니다', () => {
      const { value, base, expected } = percentageFixtures.nonZeroBase;
      const percentage = getPercentage(value, base);
      expect(percentage).toBe(expected);
    });
  });

  describe('calculateNutritionRatio', () => {
    it('식사 데이터가 없는 경우 모든 영양소가 0이어야 합니다', () => {
      const { meals, nutritionGoal, expected } = nutritionRatioFixtures.emptyMeals;
      const nutritionRatio = calculateNutritionRatio(meals, nutritionGoal);
      expect(nutritionRatio).toEqual(expected);
    });

    it('영양소 비율을 계산해야 합니다 (데이터가 있는 경우)', () => {
      const { meals, nutritionGoal, expected } = nutritionRatioFixtures.withMeals;
      const nutritionRatio = calculateNutritionRatio(meals, nutritionGoal);
      expect(nutritionRatio).toEqual(expected);
    });
  });

  describe('calculateMacroCaloriesByGram', () => {
    it('영양소의 그램수를 기반으로 칼로리를 계산해야 합니다', () => {
      const { grams, caloriesPerGram, expected } = macroCaloriesFixture;
      const result = calculateMacroCaloriesByGram(grams, caloriesPerGram);
      expect(result).toEqual(expected);
    });
  });
});
