'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const QUERY_PARAM = 'step';

type FunnelComponentsProps<T extends string> = {
  [K in T]: () => JSX.Element;
};
type UseFunnelReturnType<T extends string> = readonly [
  {
    (props: FunnelComponentsProps<T>): JSX.Element;
  },
  (step: T) => void
];

const useFunnel = <T extends string>(validSteps: readonly T[], initialStep: T): UseFunnelReturnType<T> => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlStep = searchParams.get(QUERY_PARAM) as T;

  const isValidateStep = (step: string | null): step is T => {
    if (!step) return false;
    return validSteps.includes(step as T);
  };

  const getInitialStep = () => {
    if (isValidateStep(urlStep)) return urlStep;
    return initialStep;
  };

  const [step, setInternalStep] = useState<T>(getInitialStep);

  useEffect(() => {
    if (step === urlStep) return;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(QUERY_PARAM, step);
    router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  }, [urlStep, step, pathname, router, searchParams]);

  const setStep = (newStep: T) => {
    if (step === newStep) return;
    setInternalStep(newStep);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(QUERY_PARAM, newStep);
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const Funnel = (props: FunnelComponentsProps<T>) => {
    return <>{props[step]()}</>;
  };

  return [Funnel, setStep] as const;
};

export default useFunnel;
