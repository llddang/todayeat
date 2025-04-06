'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  const params = useSearchParams();
  const step = params.get('step') ?? '0';
  const currentStep = Number(step);

  const canGoBack = currentStep > 0;

  if (!canGoBack) return null;

  return (
    <button onClick={() => router.back()} className="absolute left-4 mr-2">
      ← Back
    </button>
  );
};

export default BackButton;
