import { useMemo } from 'react';
import { NUTRITION_FEEDBACKS } from '@/app/(home)/constants/ai-feedback.constant';
import { MealNutrition, NutritionGoal } from '@/types/nutrition.type';
import { calculateNutritionDifferences, getMostSignificantDiff } from '@/app/(home)/utils/nutrition-diff.util';
import { cn } from '@/lib/shadcn';
import { Typography } from '@/components/ui/typography';

type AiFeedbackTextProps = {
  nutritionData: MealNutrition | null;
  nutritionGoal: NutritionGoal | null;
};

const AiFeedbackText = ({ nutritionData, nutritionGoal }: AiFeedbackTextProps) => {
  const hasGoal = !!nutritionGoal;
  const hasMealRecord = !!nutritionData;
  const isInactive = !hasGoal || !hasMealRecord;

  const feedbackContent = useMemo(() => {
    if (!hasGoal) {
      return NUTRITION_FEEDBACKS.EXAMPLE.NO_GOAL;
    }

    if (hasGoal && !hasMealRecord) {
      return NUTRITION_FEEDBACKS.EXAMPLE.NO_MEAL;
    }

    if (hasGoal && hasMealRecord) {
      const diffs = calculateNutritionDifferences(nutritionData, nutritionGoal);
      const mostSignificantNutrient = getMostSignificantDiff(diffs);

      if (mostSignificantNutrient.diff < 0) return NUTRITION_FEEDBACKS.BY_DIFF.low(mostSignificantNutrient);
      else if (mostSignificantNutrient.diff > 0) return NUTRITION_FEEDBACKS.BY_DIFF.high(mostSignificantNutrient);
      else return NUTRITION_FEEDBACKS.BALANCED;
    }

    return null;
  }, [hasGoal, hasMealRecord, nutritionData, nutritionGoal]);

  if (!feedbackContent) return null;

  const containerClass = cn(
    'before:bg-ai-sparkle-1 flex w-full items-start gap-2',
    'before:block before:h-6 before:w-6 before:bg-contain',
    "before:bg-no-repeat before:content-['']",
    {
      'before:grayscale before:filter': isInactive
    }
  );

  return (
    <div className={containerClass}>
      <div className="flex-1">
        <Typography as="span" variant="subTitle1" className="mb-1 block">
          {feedbackContent.title}
        </Typography>
        <Typography as="p" variant="body2" className="pr-[0.31rem] text-gray-600">
          {feedbackContent.description}
        </Typography>
      </div>
    </div>
  );
};

export default AiFeedbackText;
