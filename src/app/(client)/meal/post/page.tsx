import MealPostContents from '@/components/_meal/_post/meal-post-contents';
import { getFoodAnalysisDetail, getFoodImagesById } from '@/lib/apis/analysis-request.api';

const MealPostPage = async (): Promise<JSX.Element> => {
  const { data } = await getFoodAnalysisDetail();
  const isRecord = !!data && data.length > 0;
  return <MealPostContents isRecord={isRecord} />;
};

export default MealPostPage;
