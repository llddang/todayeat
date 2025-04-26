import MacroNutrientPieChart from '@/components/commons/macronutrient-pie-chart';
import React from 'react';
import MacronutrientPercentageBox from './macronutrient-percentage-box';
import { MacronutrientEnum, MacronutrientEnumType, MealNutrition } from '@/types/nutrition.type';
import { getPercentage } from '@/utils/nutrition-calculator.util';
import { NUTRITION_PURPOSE_OPTIONS } from '@/constants/user-personal-info.constant';
import { UserPersonalInfoDTO } from '@/types/DTO/user.dto';
import { Typography } from '@/components/ui/typography';
import CtaExampleFeedbackBanner from '@/components/commons/cta-example-feedback-banner';
import { NutrientRatio as MacronutrientComparison } from '../types/nutrition.type';
import { calculateMaxDiffNutrient, makeFeedbackMessage } from '../utils/nutrition-diff.util';
import { PeriodUnit } from '../types/chart.type';

type MacronutrientPercentageReportProps = {
  unit: PeriodUnit;
  total: MealNutrition;
  average: MealNutrition;
  personalInfo: UserPersonalInfoDTO | null;
};

const MacronutrientPercentageReport = ({ unit, total, average, personalInfo }: MacronutrientPercentageReportProps) => {
  const totalMacronutrient = total.carbohydrate + total.protein + total.fat;
  const nutrientRatio: MacronutrientComparison = {
    CARBOHYDRATE: {
      consumed: getPercentage(total.carbohydrate, totalMacronutrient),
      goal: personalInfo ? NUTRITION_PURPOSE_OPTIONS[personalInfo.purpose].ratio.carbohydrate * 100 : 0
    },
    PROTEIN: {
      consumed: getPercentage(total.protein, totalMacronutrient),
      goal: personalInfo ? NUTRITION_PURPOSE_OPTIONS[personalInfo.purpose].ratio.protein * 100 : 0
    },
    FAT: {
      consumed: getPercentage(total.fat, totalMacronutrient),
      goal: personalInfo ? NUTRITION_PURPOSE_OPTIONS[personalInfo.purpose].ratio.fat * 100 : 0
    }
  };

  const nutrientAverage: MacronutrientComparison = {
    CARBOHYDRATE: {
      consumed: average.carbohydrate,
      goal: personalInfo ? personalInfo.dailyCarbohydrateGoal : 0
    },
    PROTEIN: {
      consumed: average.protein,
      goal: personalInfo ? personalInfo.dailyProteinGoal : 0
    },
    FAT: {
      consumed: average.fat,
      goal: personalInfo ? personalInfo.dailyFatGoal : 0
    }
  };

  const { key, consumed, goal } = calculateMaxDiffNutrient(nutrientAverage);

  const nutrientMap: Record<MacronutrientEnumType, string> = {
    CARBOHYDRATE: '탄수화물',
    PROTEIN: '단백질',
    FAT: '지방'
  };

  const [beforeBreak, afterBreak] = makeFeedbackMessage(
    unit,
    nutrientMap[key as MacronutrientEnumType],
    consumed,
    goal
  );

  return (
    <div className="flex flex-col">
      {!personalInfo && (
        <CtaExampleFeedbackBanner
          title="건강 목표가 아직 설정되지 않았어요"
          description={
            <>
              건강 목표를 설정하고 식사를 기록하면 <br /> 목표량과 섭취량을 비교할 수 있어요!
            </>
          }
        />
      )}
      <Typography as="h2" variant="subTitle1">
        {beforeBreak} <br /> {afterBreak}
      </Typography>
      <div className="flex">
        <MacroNutrientPieChart data={total} />
        <div className="m-auto flex flex-col gap-4">
          <MacronutrientPercentageBox
            variety={MacronutrientEnum.CARBOHYDRATE}
            value={nutrientRatio.CARBOHYDRATE.consumed}
            goal={nutrientRatio.CARBOHYDRATE.goal}
          />
          <MacronutrientPercentageBox
            variety={MacronutrientEnum.PROTEIN}
            value={nutrientRatio.PROTEIN.consumed}
            goal={nutrientRatio.PROTEIN.goal}
          />
          <MacronutrientPercentageBox
            variety={MacronutrientEnum.FAT}
            value={nutrientRatio.FAT.consumed}
            goal={nutrientRatio.FAT.goal}
          />
        </div>
      </div>
    </div>
  );
};

export default MacronutrientPercentageReport;
