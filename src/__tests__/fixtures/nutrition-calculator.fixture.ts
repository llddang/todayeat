import { ActivityLevel, Gender, Purpose } from '@/types/user-personal-info.type';
import { MealDTO } from '@/types/DTO/meal.dto';
import { getKoreaTime } from '@/utils/date.util';

// BMR 테스트
export const bmrFixtures = {
  manFixture: {
    weight: 70,
    height: 170,
    age: 20,
    gender: Gender.MAN,
    expectedBmr: 1667.5
  },
  womanFixture: {
    weight: 70,
    height: 170,
    age: 20,
    gender: Gender.WOMAN,
    expectedBmr: 1501.5
  },
  olderManFixture: {
    weight: 70,
    height: 170,
    age: 50,
    gender: Gender.MAN,
    expectedBmr: 1517.5
  }
};

// 일일 영양소 계산
export const dailyNutritionFixture = {
  calories: 1000,
  ratio: {
    carbohydrate: 0.5,
    protein: 0.3,
    fat: 0.2
  },
  expected: {
    dailyCarbohydrateGoal: 125,
    dailyProteinGoal: 75,
    dailyFatGoal: 22
  }
};

// 일일 칼로리 계산 픽스처
export const dailyCaloriesFixture = {
  bmr: 1550,
  activityMultiplier: 1.2,
  purposeMultiplier: 1,
  expectedCalories: 1860
};

// 일일 영양소 목표 계산
export const dailyNutritionGoalFixture = {
  userInfo: {
    gender: Gender.MAN,
    height: 170,
    weight: 70,
    age: 20,
    activityLevel: ActivityLevel.MODERATE,
    purpose: Purpose.WEIGHT_MAINTENANCE
  },
  expected: {
    dailyCaloriesGoal: 2585,
    dailyCarbohydrateGoal: 291,
    dailyProteinGoal: 194,
    dailyFatGoal: 72
  }
};

// 총 영양소 계산
export const totalNutritionFixture = {
  meals: [
    {
      id: '1',
      createdAt: getKoreaTime().toISOString(),
      userId: '1',
      foodImages: [],
      mealCategory: 'BREAKFAST',
      memo: '오늘의 식사',
      ateAt: getKoreaTime().toISOString(),
      mealDetails: [
        {
          id: '1',
          mealId: '1',
          menuName: '밥',
          weight: 100,
          calories: 100,
          carbohydrate: 10,
          protein: 2,
          fat: 1
        }
      ]
    }
  ] as MealDTO[],
  expected: {
    calories: 100,
    carbohydrate: 10,
    protein: 2,
    fat: 1
  }
};

// 고유 날짜 계산
export const uniqueDatesFixture = {
  meals: [
    {
      id: '1',
      createdAt: getKoreaTime().toISOString(),
      userId: '1',
      foodImages: [],
      mealCategory: 'BREAKFAST',
      memo: '오늘의 식사',
      ateAt: '2023-04-25T12:00:00Z',
      mealDetails: []
    },
    {
      id: '2',
      createdAt: getKoreaTime().toISOString(),
      userId: '1',
      foodImages: [],
      mealCategory: 'BREAKFAST',
      memo: '오늘의 식사',
      ateAt: '2023-04-26T12:00:00Z',
      mealDetails: []
    }
  ] as MealDTO[],
  expectedCount: 2
};

// 영양소 평균 계산
export const nutritionAverageFixtures = {
  emptyMealDetails: [
    {
      id: '1',
      createdAt: getKoreaTime().toISOString(),
      userId: '1',
      foodImages: [],
      mealCategory: 'BREAKFAST',
      memo: '오늘의 식사',
      ateAt: '2023-04-25T12:00:00Z',
      mealDetails: []
    }
  ] as MealDTO[],
  multiDayMeals: [
    {
      id: '1',
      createdAt: getKoreaTime().toISOString(),
      userId: '1',
      foodImages: [],
      mealCategory: 'BREAKFAST',
      memo: '첫째 날 식사',
      ateAt: '2023-04-25T12:00:00Z',
      mealDetails: [
        {
          id: '1',
          mealId: '1',
          menuName: '밥',
          weight: 100,
          calories: 100,
          carbohydrate: 10,
          protein: 2,
          fat: 1
        }
      ]
    },
    {
      id: '2',
      createdAt: getKoreaTime().toISOString(),
      userId: '1',
      foodImages: [],
      mealCategory: 'BREAKFAST',
      memo: '둘째 날 식사',
      ateAt: '2023-04-26T12:00:00Z',
      mealDetails: [
        {
          id: '2',
          mealId: '2',
          menuName: '빵',
          weight: 50,
          calories: 200,
          carbohydrate: 30,
          protein: 4,
          fat: 2
        }
      ]
    }
  ] as MealDTO[],
  expectedAverageEmpty: {
    calories: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0
  },
  expectedAverageMultiDay: {
    calories: 150,
    carbohydrate: 20,
    protein: 3,
    fat: 2
  }
};

// 백분율 계산
export const percentageFixtures = {
  zeroBase: {
    value: 100,
    base: 0,
    expected: 0
  },
  nonZeroBase: {
    value: 100,
    base: 100,
    expected: 100
  }
};

// 영양소 비율 계산
export const nutritionRatioFixtures = {
  emptyMeals: {
    meals: [] as MealDTO[],
    nutritionGoal: {
      dailyCaloriesGoal: 2585,
      dailyCarbohydrateGoal: 291,
      dailyProteinGoal: 194,
      dailyFatGoal: 72
    },
    expected: {
      calories: 0,
      carbohydrate: 0,
      protein: 0,
      fat: 0
    }
  },
  withMeals: {
    meals: [
      {
        id: '1',
        createdAt: getKoreaTime().toISOString(),
        userId: '1',
        foodImages: [],
        mealCategory: 'BREAKFAST',
        memo: '맛있었다',
        ateAt: '2023-04-25T08:00:00Z',
        mealDetails: [
          {
            id: '1',
            mealId: '1',
            menuName: '현미밥',
            weight: 150,
            calories: 200,
            carbohydrate: 45,
            protein: 5,
            fat: 1
          },
          {
            id: '2',
            mealId: '1',
            menuName: '계란후라이',
            weight: 50,
            calories: 100,
            carbohydrate: 1,
            protein: 7,
            fat: 8
          }
        ]
      }
    ] as MealDTO[],
    nutritionGoal: {
      dailyCaloriesGoal: 2000,
      dailyCarbohydrateGoal: 250,
      dailyProteinGoal: 150,
      dailyFatGoal: 55
    },
    expected: {
      calories: 15,
      carbohydrate: 18,
      protein: 8,
      fat: 16
    }
  }
};

// 매크로 영양소 칼로리 계산
export const macroCaloriesFixture = {
  grams: 100,
  caloriesPerGram: 4,
  expected: {
    grams: 100,
    calories: 400
  }
};
