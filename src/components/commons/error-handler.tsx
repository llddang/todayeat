'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PUBLIC_ERROR_MESSAGE, { isPublicErrorMessage } from '@/constants/public-error-message.constant';
import Modal from './modal';

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

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete('error_code');

    const newSearch = currentParams.toString() ? `?${currentParams.toString()}` : '';
    const newUrl = window.location.pathname + newSearch;

    router.replace(newUrl, { scroll: false });
  };

  useEffect(() => {
    const errorCode = searchParams.get('error_code');
    if (!errorCode) return;
    if (!isPublicErrorMessage(errorCode)) return;

    const errorConfig = PUBLIC_ERROR_MESSAGE[errorCode];

    setModalInfo({ title: errorConfig.message, description: errorConfig.action });
  }, [searchParams, router]);

  return <Modal open={!!modalInfo.title} onOpenChange={handleClose} {...modalInfo} />;
};
export default ErrorHandler;
