'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ErrorHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const errorCode = searchParams.get('error_code');
    if (errorCode === 'Unauthenticated') {
      alert('로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.');
      const newUrl = window.location.pathname;
      router.replace(newUrl);
    }
  }, [searchParams, router]);

  return null;
};
export default ErrorHandler;
