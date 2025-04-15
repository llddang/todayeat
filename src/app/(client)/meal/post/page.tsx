import MealPostContents from '@/components/_meal/_post/meal-post-contents';
import { getFoodImagesById } from '@/lib/apis/analysis-request.api';
import { getUser } from '@/lib/apis/user.api';
import { FoodAnalysisRequestsDTO } from '@/types/DTO/food_analysis.dto';

const MealPostPage = async (): Promise<JSX.Element> => {
  const { id } = await getUser();
  const { data: requestImages }: { data: FoodAnalysisRequestsDTO | null } = await getFoodImagesById(id);

  return <MealPostContents initialImages={requestImages?.image_urls} />;
};

export default MealPostPage;
