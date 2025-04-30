import { Typography } from '@/components/ui/typography';
import { MealDetailDTO } from '@/types/DTO/meal.dto';
import MealListCard from './meal-list-card';

type MealListProps = {
  mealDetails: MealDetailDTO[];
};

const MealList = ({ mealDetails }: MealListProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-1">
        <Typography as="span" variant="body1" className="px-1">
          음식 정보
        </Typography>
        <Typography as="span" variant="body1" className="flex-1">
          {mealDetails.length}
        </Typography>
      </div>
      {mealDetails.map((mealDetail) => (
        <MealListCard key={mealDetail.id} mealDetail={mealDetail} />
      ))}
    </div>
  );
};

export default MealList;
