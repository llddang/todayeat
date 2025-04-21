import { getAiResponses, getFoodImagesById } from '@/apis/analysis-request.api';
import { getUser } from '@/apis/user.api';
import EditResultSection from './components/edit-result-section';

const MealPostEditPage = async (): Promise<JSX.Element> => {
  const { id: userId } = await getUser();
  const { data: imageList } = await getFoodImagesById(userId);
  const aiResponses = await getAiResponses();

  if (!userId) {
    return <div>로그인 세션이 만료되었습니다. 로그인을 다시해주세요.</div>;
  }
  if (!imageList || aiResponses.length === 0) return <div>등록된 음식 정보가 없습니다.</div>;

  return (
    <div>
      <EditResultSection imageList={imageList.imageUrls} mealList={aiResponses} />
    </div>
  );
};

export default MealPostEditPage;
