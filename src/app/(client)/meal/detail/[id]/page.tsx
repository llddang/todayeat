import { notFound } from 'next/navigation';
import { getMyMealById } from '@/apis/meal.api';
import MealDetailSection from '../components/meal-detail-section';

type MealDetailPageProps = {
  params: {
    id: string;
  };
};

const MealDetailPage = async ({ params }: MealDetailPageProps) => {
  try {
    const meal = await getMyMealById(params.id);

    if (!meal) {
      notFound();
    }

    return <MealDetailSection meal={meal} />;
  } catch (error) {
    console.error('식사 정보를 불러오는데 실패하였습니다.:', error);
    notFound();
  }
};

export default MealDetailPage;
