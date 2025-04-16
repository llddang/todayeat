import HomeMealCardImagePreview from '@/components/_home/home-meal-card-image-preview';
import { Typography } from '@/components/ui/typography';
import { MealDTO } from '@/types/DTO/meal.dto';

type HomeMealCardTitleProps = {
  mealLabel: string;
  calories: number;
  images: MealDTO['foodImages'];
};
const HomeMealCardTitle = ({ mealLabel, calories, images }: HomeMealCardTitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Typography variant="body3" className="text-gray-700">
          {mealLabel}
        </Typography>
        <div className="flex items-end gap-0.5">
          <Typography variant="subTitle2" className="text-gray-900">
            {calories}
          </Typography>
          <Typography variant="body3" className="text-gray-800">
            kcal
          </Typography>
        </div>
      </div>
      <HomeMealCardImagePreview images={images} />
    </div>
  );
};
export default HomeMealCardTitle;
