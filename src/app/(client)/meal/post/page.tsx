import MealPostContents from '@/components/_meal/_post/meal-post-contents';
import { getFoodAnalysisDetail } from '@/lib/apis/analysis-request.api';

const MealPostPage = async (): Promise<JSX.Element> => {
  const data = await getFoodAnalysisDetail();
  const isRecorded = !!data && data.length > 0;
  return <MealPostContents isRecorded={isRecorded} />;
};

export default MealPostPage;
