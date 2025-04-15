import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteMealAnalysisDetail } from '@/lib/apis/meal.api';
import SITE_MAP from '@/constants/site-map.constant';

const useMealPostModal = (initialImages: string[] = []) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setShowModal(true);
    }
  }, [initialImages]);

  const handleApproveClick = () => {
    router.push(SITE_MAP.MEAL_POST_EDIT);
  };

  const handleCancelClick = async () => {
    await deleteMealAnalysisDetail();
    setShowModal(false);
  };

  return {
    showModal,
    setShowModal,
    handleApproveClick,
    handleCancelClick
  };
};

export default useMealPostModal;
