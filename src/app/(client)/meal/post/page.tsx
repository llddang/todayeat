import { getAiResponses } from '@/apis/analysis-request.api';
import UploadImageSection from './_components/upload-image-section';

const MealPostPage = async () => {
  const data = await getAiResponses();
  const isRecorded = !!data && data.length > 0;
  return <UploadImageSection isRecorded={isRecorded} />;
};

export default MealPostPage;
