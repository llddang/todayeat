import MacroNutrientPieChart from '@/components/commons/macronutrient-pie-chart';
import CtaExampleFeedbackBanner from '@/components/commons/cta-example-feedback-banner';
import { Typography } from '@/components/ui/typography';
import MacronutrientPercentageBox from './macronutrient-percentage-box';
import { getPercentage } from '@/utils/nutrition-calculator.util';
import { calculateMaxDiffNutrient, makeFeedbackMessage } from '../utils/nutrition-diff.util';
import { NUTRITION_PURPOSE_OPTIONS } from '@/constants/user-personal-info.constant';
import { UserPersonalInfoDTO } from '@/types/DTO/user.dto';
import { MacronutrientEnum, MacronutrientEnumType, MealNutrition } from '@/types/nutrition.type';
import { MacronutrientComparison } from '../types/nutrition.type';
import { PeriodUnit } from '../types/chart.type';
import { AMOUNT_CHART_OPTIONS } from '../constants/chart.constant';
import useIsMobile from '@/hooks/use-is-mobile';
import PieChartSkeleton from './pie-chart-skeleton';
import { cn } from '@/lib/shadcn';

type MacronutrientPercentageReportProps = {
  unit: PeriodUnit;
  total: MealNutrition;
  average: MealNutrition;
  personalInfo: UserPersonalInfoDTO | null;
  isLoading: boolean;
};

const MacronutrientPercentageReport = ({
  unit,
  total,
  average,
  personalInfo,
  isLoading
}: MacronutrientPercentageReportProps) => {
  const isMobile = useIsMobile();

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

  const {
    key = 'CARBOHYDRATE' as MacronutrientEnumType,
    consumed,
    goal
  } = calculateMaxDiffNutrient(average, personalInfo);

  const [beforeBreak, afterBreak] = makeFeedbackMessage(
    unit,
    AMOUNT_CHART_OPTIONS[key as MacronutrientEnumType].label,
    consumed,
    goal
  );

  return isLoading ? (
    <div className="flex flex-col gap-10 xl:flex-1">
      <PieChartSkeleton />
    </div>
  ) : (
    <div className="flex flex-col xl:flex-1">
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
      {personalInfo && total.calories > 0 && (
        <Typography as="h2" variant="subTitle1">
          {beforeBreak} <br /> {afterBreak}
        </Typography>
      )}
      <div className="flex xl:w-full xl:flex-col xl:items-center xl:gap-6">
        <MacroNutrientPieChart
          data={total}
          innerRadius={isMobile ? MOBILE_INNER_RADIUS : personalInfo ? PC_INNER_RADIUS_LARGE : PC_INNER_RADIUS_SMALL}
          className={cn(personalInfo ? 'xl:h-[18.75rem]' : 'xl:h-[12.5rem]', 'h-[13.1875rem]')}
        />
        <div className="m-auto flex flex-col gap-4 xl:w-full xl:px-10 xl:pb-6">
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

const MOBILE_INNER_RADIUS = 56;
const PC_INNER_RADIUS_LARGE = 80;
const PC_INNER_RADIUS_SMALL = 53;
