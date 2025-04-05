'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PUBLIC_ERROR_MESSAGE, { isPublicErrorMessage } from '@/constants/public-error-message.constant';

const ErrorHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const errorCode = searchParams.get('error_code');
    if (!errorCode) return;
    if (!isPublicErrorMessage(errorCode)) return;

    const errorConfig = PUBLIC_ERROR_MESSAGE[errorCode];

    alert(errorConfig.message);
    router.replace(window.location.pathname);
  }, [searchParams, router]);

  return null;
};
export default ErrorHandler;
