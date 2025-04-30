'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export const Error = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h2 className="mb-4 text-2xl font-bold">문제가 발생했습니다</h2>
      <p className="mb-6">죄송합니다. 요청을 처리하는 중에 오류가 발생했습니다.</p>
    </div>
  );
};
