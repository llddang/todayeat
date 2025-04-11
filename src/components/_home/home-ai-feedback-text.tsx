import { useMemo } from 'react';
import { NUTRITION_FEEDBACKS } from '@/constants/home.constant';
import { MealNutrition, NutritionGoal } from '@/types/nutrition.type';
import { calculateNutritionDifferences, getFeedbackDescription, getMostSignificantDiff } from '@/lib/utils/home.util';
import { cn } from '@/lib/utils';

type HomeAiFeedbackTextProps = {
  nutritionData: MealNutrition | null;
  nutritionGoal: NutritionGoal | null;
};

const HomeAiFeedbackText = ({ nutritionData, nutritionGoal }: HomeAiFeedbackTextProps) => {
  const hasGoal = !!nutritionGoal;
  const hasMealRecord = !!nutritionData;
  const isInactive = !hasGoal || !hasMealRecord;

  const feedbackContent = useMemo(() => {
    if (!hasGoal) {
      return NUTRITION_FEEDBACKS.DEFAULT.NO_GOAL;
    }

    if (hasGoal && !hasMealRecord) {
      return NUTRITION_FEEDBACKS.DEFAULT.NO_MEAL;
    }

    if (hasGoal && hasMealRecord) {
      const diffs = calculateNutritionDifferences(nutritionData, nutritionGoal);
      const mostSignificantDiff = getMostSignificantDiff(diffs);

      if (mostSignificantDiff.diff < 0) {
        const absDiff = Math.abs(mostSignificantDiff.diff);
        return {
          title: `${mostSignificantDiff.label}이 목표보다 ${Math.round(absDiff)}g 부족해요`,
          description: getFeedbackDescription(mostSignificantDiff.name, 'low')
        };
      }

      if (mostSignificantDiff.diff > 0) {
        return {
          title: `${mostSignificantDiff.label}이 목표보다 ${Math.round(mostSignificantDiff.diff)}g 초과됐어요`,
          description: getFeedbackDescription(mostSignificantDiff.name, 'high')
        };
      }

      return NUTRITION_FEEDBACKS.DEFAULT.BALANCED;
    }

    return null;
  }, [hasGoal, hasMealRecord, nutritionData, nutritionGoal]);

  if (!feedbackContent) return null;

  const containerClass = cn(
    'before:bg-ai-sparkle flex w-full items-start gap-1.5 pb-2',
    'before:block before:h-8 before:w-5 before:bg-contain',
    "before:bg-[position:center_top_0.19rem] before:bg-no-repeat before:content-['']",
    {
      'before:grayscale before:filter': isInactive
    }
  );

  return (
    <div className={containerClass}>
      <div className="flex-1">
        <span className="mb-1.5 block text-lg font-semibold tracking-[-0.0225rem]">{feedbackContent.title}</span>
        <p className="pr-[0.31rem] text-[15px] tracking-snug text-gray-600">{feedbackContent.description}</p>
      </div>
    </div>
  );
};

export default HomeAiFeedbackText;
