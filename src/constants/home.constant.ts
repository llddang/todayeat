import { MacronutrientDiffItem } from '@/types/home.type';

export const RADIUS = 44;
export const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
export const NUTRITION_FEEDBACKS = {
  PROTEIN: {
    low: '근손실을 막으려면 단백질을 충분히 섭취하는 게 중요해요. 두부, 달걀, 닭가슴살 같은 단백질 식품을 더해보세요.',
    high: '과도한 단백질 섭취는 신장에 부담을 줄 수 있어요. 다양한 영양소의 균형을 맞추는 것이 중요해요.'
  },
  CARBOHYDRATE: {
    low: '적절한 탄수화물은 중요한 에너지원이에요. 통곡물, 과일, 채소로 건강한 탄수화물을 보충해보세요.',
    high: '탄수화물 과다 섭취는 혈당 상승을 유발할 수 있어요. 다음 식사에는 단백질과 채소의 비중을 높여보세요.'
  },
  FAT: {
    low: '건강한 지방은 호르몬 생성과 영양소 흡수에 필요해요. 아보카도, 견과류, 올리브유를 활용해보세요.',
    high: '지방 섭취가 과다하네요. 다음 식사에는 저지방 단백질과 채소 위주로 구성해보세요.'
  },
  BALANCED: {
    title: '오늘의 영양 균형이 좋아요',
    description: '목표에 맞는 균형 잡힌 식단을 유지하고 계세요. 건강한 식습관을 계속 유지하세요!'
  },
  EXAMPLE: {
    NO_GOAL: {
      title: '단백질이 목표보다 20g 부족해요',
      description: '근손실을 막으려면 단백질을 충분히 섭취하는 게 중요해요. 두부, 달걀 같은 단백질 식품을 더해보세요.'
    },
    NO_MEAL: {
      title: '첫 식사를 기록해 보세요!',
      description:
        '아직 피드백을 드릴 수 없어요. 사진으로 식사를 기록하고 목표를 설정해서 개인 맞춤 피드백을 받아 보세요!'
    }
  },
  BY_DIFF: {
    low: (nutrient: MacronutrientDiffItem) => ({
      title: `${nutrient.label}이 목표보다 ${Math.round(Math.abs(nutrient.diff))}g 부족해요`,
      description: NUTRITION_FEEDBACKS[nutrient.name]['low']
    }),
    high: (nutrient: MacronutrientDiffItem) => ({
      title: `${nutrient.label}이 목표보다 ${Math.round(nutrient.diff)}g 초과됐어요`,
      description: NUTRITION_FEEDBACKS[nutrient.name]['high']
    })
  }
};
