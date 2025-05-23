import { Typography } from '@/components/ui/typography';
import { MacronutrientEnumType, MealNutrition } from '@/types/nutrition.type';
import { PeriodUnit } from '../_types/chart.type';
import { UserPersonalInfoDTO } from '@/types/DTO/user.dto';
import MacronutrientAmountBox from './macronutrient-amount-box';
import { MACRONUTRIENT_OPTIONS } from '@/constants/nutrition.constant';
import { MACRONUTRIENT_GOAL_MAP, MACRONUTRIENT_MAP } from '../_constants/chart.constant';
import { getPercentage } from '@/utils/nutrition-calculator.util';

type MacronutrientAmountReportProps = {
  variety: MacronutrientEnumType;
  average: MealNutrition;
  personalInfo: UserPersonalInfoDTO | null;
  unit: PeriodUnit;
  isLoading: boolean;
};

const MacronutrientAmountReport = ({
  variety,
  average,
  personalInfo,
  unit,
  isLoading
}: MacronutrientAmountReportProps) => {
  const { label, color } = MACRONUTRIENT_OPTIONS[variety];

  const consumeAmount = average[MACRONUTRIENT_MAP[variety]];
  const goalAmount = personalInfo ? personalInfo[MACRONUTRIENT_GOAL_MAP[variety]] : 0;
  const max = Math.max(consumeAmount, goalAmount) || 1;
  const consumeRatio = getPercentage(consumeAmount, max);
  const goalRatio = getPercentage(goalAmount, max);
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-4 text-gray-700">
      <Typography as="h3" variant="subTitle4">
        {label}
      </Typography>
      {personalInfo && (
        <div className="space-y-[0.5625rem] pb-2 pt-1">
          <div className={`h-4 rounded-sm ${color}`} style={{ width: consumeAmount ? `${consumeRatio}%` : '0.5rem' }} />
          <div className="h-4 rounded-sm bg-gray-300" style={{ width: `${goalRatio}%` }} />
        </div>
      )}
      <div className="flex items-center justify-between">
        <MacronutrientAmountBox unit={unit} variety={variety} value={consumeAmount} isLoading={isLoading} />
        <MacronutrientAmountBox unit={unit} variety="GOAL" value={goalAmount} />
      </div>
    </div>
  );
};

export default MacronutrientAmountReport;
