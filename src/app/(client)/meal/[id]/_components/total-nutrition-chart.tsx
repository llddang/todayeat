import MacronutrientBox from '@/components/commons/macronutrient-box';
import MacronutrientPieChart from '@/components/commons/macronutrient-pie-chart';
import { Typography } from '@/components/ui/typography';
import { MacronutrientEnum } from '@/types/nutrition.type';

type TotalNutritionChartProps = {
  totalNutrition: { calories: number; carbohydrate: number; protein: number; fat: number };
};

const TotalNutritionChart = ({ totalNutrition }: TotalNutritionChartProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Typography as="span" variant="body1" className="px-1">
        총 영양 정보
      </Typography>
      <div className="min-w-auto flex min-h-[13.125rem] w-full items-center justify-center gap-3 rounded-2xl bg-white/50 p-3 backdrop-blur-[50px]">
        <MacronutrientPieChart data={totalNutrition} displayCalories={true} className="w-[14.5625rem]" />
        <div className="flex w-[5.75rem] flex-col items-start justify-center gap-4 px-1">
          <MacronutrientBox variety={MacronutrientEnum.CARBOHYDRATE} value={totalNutrition.carbohydrate} />
          <MacronutrientBox variety={MacronutrientEnum.PROTEIN} value={totalNutrition.protein} />
          <MacronutrientBox variety={MacronutrientEnum.FAT} value={totalNutrition.fat} />
        </div>
      </div>
    </div>
  );
};

export default TotalNutritionChart;
