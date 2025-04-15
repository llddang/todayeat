import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteMealAnalysisDetail } from '@/lib/apis/meal.api';
import SITE_MAP from '@/constants/site-map.constant';

const useMealPostModal = (isRecord: boolean = false) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isRecord) {
      setShowModal(true);
    }
  }, []);

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
