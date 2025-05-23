import { redirect } from 'next/navigation';
import { getAiResponses, getFoodImagesById } from '@/apis/analysis-request.api';
import { getUser } from '@/apis/user.api';
import EditResultSection from './_components/edit-result-section';

const MealPostEditPage = async () => {
  const { id: userId } = await getUser();
  const { data: initialImageList } = await getFoodImagesById(userId);
  const aiResponses = await getAiResponses();
  const imageList = initialImageList?.imageUrls || [];

  if (!userId || aiResponses.length === 0) {
    redirect('/meal/post');
  }

  return <EditResultSection imageList={imageList} initialMealList={aiResponses} />;
};

export default MealPostEditPage;
