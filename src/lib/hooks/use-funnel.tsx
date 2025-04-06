/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const QUERY_PARAM = 'step';

type FunnelComponentProps<K extends Record<string, any>, T extends Extract<keyof K, string>> = {
  [Step in T]: (props: {
    setStep: <NextStep extends T>(nextStep: NextStep, requireData: K[NextStep]) => void;
  }) => JSX.Element;
};
type UseFunnelReturnType<K extends Record<string, any>, T extends Extract<keyof K, string>> = readonly [
  (props: FunnelComponentProps<K, T>) => JSX.Element,
  <NextStep extends T>(nextStep: NextStep, requireData: K[NextStep]) => void
];

const useFunnel = <K extends Record<string, any>, T extends Extract<keyof K, string>>(
  initialStep: T,
  validateStep: Record<T, () => boolean>
): UseFunnelReturnType<K, T> => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlStep = searchParams.get(QUERY_PARAM) as T;

  const isValidateStep = (step: string | null): step is T => {
    if (!step) return false;
    return step in validateStep;
  };

  const getInitialStep = () => {
    if (isValidateStep(urlStep) && validateStep[urlStep]()) return urlStep;
    return initialStep;
  };

  const [step, setInternalStep] = useState<T>(getInitialStep);

  useEffect(() => {
    if (step === urlStep) return;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(QUERY_PARAM, step);
    router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  }, [urlStep, step, pathname, router, searchParams]);

  const setStep = (newStep: T, requireData: K[T]) => {
    if (step === newStep) return;
    if (!validateStep[newStep]) return;

    setInternalStep(newStep);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(QUERY_PARAM, newStep);
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const Funnel = (props: FunnelComponentProps<K, T>) => {
    return <>{props[step]({ setStep })}</>;
  };

  return [Funnel, setStep] as const;
};

export default useFunnel;
