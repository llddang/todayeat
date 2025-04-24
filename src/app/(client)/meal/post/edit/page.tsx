import { redirect } from 'next/navigation';
import { getAiResponses, getFoodImagesById } from '@/apis/analysis-request.api';
import { getUser } from '@/apis/user.api';
import EditResultSection from './components/edit-result-section';

const MealPostEditPage = async (): Promise<JSX.Element> => {
  const { id: userId } = await getUser();
  const { data: imageList } = await getFoodImagesById(userId);
  const aiResponses = await getAiResponses();

  if (!userId || !imageList || aiResponses.length === 0) {
    redirect('/meal/post');
  }

  return <EditResultSection imageList={imageList.imageUrls} initialMealList={aiResponses} />;
};

export default MealPostEditPage;
