import Contents from '@/app/(client)/meal/post/components/upload-image-section';
import { getAiResponses } from '@/lib/apis/analysis-request.api';

const MealPostPage = async (): Promise<JSX.Element> => {
  const data = await getAiResponses();
  const isRecorded = !!data && data.length > 0;
  return <Contents isRecorded={isRecorded} />;
};

export default MealPostPage;
