'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PUBLIC_ERROR_MESSAGE, { isPublicErrorMessage } from '@/constants/public-error-message.constant';
import InformationModal from './information-modal';

const defaultModalInfo = {
  title: '',
  description: ''
};

const ErrorHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [modalInfo, setModalInfo] = useState(defaultModalInfo);

  const handleClose = () => {
    setModalInfo(defaultModalInfo);
    router.replace(window.location.pathname);
  };

  useEffect(() => {
    const errorCode = searchParams.get('error_code');
    if (!errorCode) return;
    if (!isPublicErrorMessage(errorCode)) return;

    const errorConfig = PUBLIC_ERROR_MESSAGE[errorCode];

    setModalInfo({ title: errorConfig.message, description: errorConfig.action });
  }, [searchParams, router]);

  return <InformationModal open={!!modalInfo.title} onOpenChange={handleClose} {...modalInfo} />;
};
export default ErrorHandler;
