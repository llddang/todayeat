import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getAiResponses, getFoodImagesById } from '@/apis/analysis-request.api';
import { getUser } from '@/apis/user.api';
import EditResultSection from './components/edit-result-section';

export const generateMetadata = async (): Promise<Metadata> => {
  const { id: userId } = await getUser();
  const { data: imageList } = await getFoodImagesById(userId);
  const aiResponses = await getAiResponses();

  if (!userId || !imageList || aiResponses.length === 0) {
    return {
      title: '등록된 식사정보가 없습니다 | 투데잇',
      description: '식사 정보를 먼저 등록해 주세요.'
    };
  }

  return {
    title: '음식 등록 | 투데잇',
    description: '오늘 먹은 음식을 등록하고 기록해 보세요.',
    keywords: ['식단 기록', '음식 분석', 'AI 영양소 계산', '칼로리 기록']
  };
};

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
