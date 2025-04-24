import { getMyMealById } from '@/apis/meal.api';
import { MealDTO } from '@/types/DTO/meal.dto';
import MealDetailSection from './components/meal-detail-section';

type DetailPageProps = {
  searchParams: {
    id: string;
  };
};

const DetailPage = async ({ searchParams }: DetailPageProps): Promise<JSX.Element> => {
  const meal: MealDTO = await getMyMealById(searchParams.id);
  return <MealDetailSection meal={meal} />;
};

export default DetailPage;
