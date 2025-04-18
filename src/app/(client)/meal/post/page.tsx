import Contents from '@/app/(client)/meal/post/components/contents';
import { getFoodAnalysisDetail } from '@/lib/apis/analysis-request.api';

const MealPostPage = async (): Promise<JSX.Element> => {
  const data = await getFoodAnalysisDetail();
  const isRecorded = !!data && data.length > 0;
  return <Contents isRecorded={isRecorded} />;
};

export default MealPostPage;
