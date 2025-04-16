import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteMealAnalysisDetail } from '@/lib/apis/meal.api';
import SITE_MAP from '@/constants/site-map.constant';

const useMealPostModal = (isRecorded: boolean = false) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isRecorded) {
      setShowModal(true);
    }
  }, []);

  const handleApproveClick = () => {
    router.push(SITE_MAP.MEAL_POST_EDIT);
  };

  const handleCancelClick = async () => {
    try {
      await deleteMealAnalysisDetail();
      setShowModal(false);
    } catch (error) {
      console.error('임시 데이터 삭제 중 오류 발생:', error);
    }
  };

  return {
    showModal,
    setShowModal,
    handleApproveClick,
    handleCancelClick
  };
};

export default useMealPostModal;
