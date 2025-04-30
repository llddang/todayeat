'use client';

import GlassBackground from '@/components/commons/glass-background';
import { useUserStore } from '@/store/user-store';
import MacronutrientPercentageReport from './macronutrient-percentage-report';
import MacronutrientAmountReport from './macronutrient-amount-report';
import CaloriesAmountReport from './calories-amount-report';
import { useFetchReport } from '../_hooks/use-fetch-report';
import { PeriodUnit } from '../_types/chart.type';

const Charts = ({ unit }: { unit: PeriodUnit }) => {
  const { id: userId, personalInfo } = useUserStore((state) => state.user);
  const { barChart, total, average, isLoading } = useFetchReport(userId, unit);

  return (
    <div className="xl:flex xl:gap-4 xl:px-[3.12rem]">
      <GlassBackground className="mb-4 min-h-full w-full rounded-2xl p-4 xl:w-[25rem] xl:self-start">
        <CaloriesAmountReport
          total={total}
          unit={unit}
          barChart={barChart}
          personalInfo={personalInfo}
          isLoading={isLoading}
        />
      </GlassBackground>
      <GlassBackground className="flex min-h-full w-full flex-col gap-4 rounded-2xl p-4 xl:flex-1 xl:flex-row">
        <MacronutrientPercentageReport
          unit={unit}
          total={total}
          average={average}
          personalInfo={personalInfo}
          isLoading={isLoading}
        />
        <div className="flex flex-1 flex-col gap-2">
          <MacronutrientAmountReport
            unit={unit}
            variety="CARBOHYDRATE"
            average={average}
            personalInfo={personalInfo}
            isLoading={isLoading}
          />
          <MacronutrientAmountReport
            unit={unit}
            variety="PROTEIN"
            average={average}
            personalInfo={personalInfo}
            isLoading={isLoading}
          />
          <MacronutrientAmountReport
            unit={unit}
            variety="FAT"
            average={average}
            personalInfo={personalInfo}
            isLoading={isLoading}
          />
        </div>
      </GlassBackground>
    </div>
  );
};

export default Charts;
