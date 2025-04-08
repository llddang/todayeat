/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import * as Sentry from '@sentry/nextjs';

const QUERY_PARAM = 'step';
const SESSION_KEY = 'funnel_data';

type FunnelComponentProps<K extends Record<string, any>, T extends Extract<keyof K, string>> = {
  [Step in T]: (props: {
    setStep: <NextStep extends T>(nextStep: NextStep, data: K[NextStep]) => void;
    data: K[Step];
  }) => JSX.Element;
};
type UseFunnelReturnType<K extends Record<string, any>, T extends Extract<keyof K, string>> = readonly [
  (props: FunnelComponentProps<K, T>) => JSX.Element,
  <NextStep extends T>(nextStep: NextStep, data: K[NextStep]) => void
];

const useFunnel = <K extends Record<string, any>, T extends Extract<keyof K, string>>(
  initialStep: T,
  validateStep: Record<T, (data: K[T]) => boolean>,
  initialData?: K[T]
): UseFunnelReturnType<K, T> => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const safeSessionStorage = typeof window !== 'undefined' ? window.sessionStorage : null;

  const urlStep = searchParams.get(QUERY_PARAM) as T;
  const sessionData = safeSessionStorage?.getItem(SESSION_KEY) ?? '{}';
  let stepData = initialData;
  try {
    stepData = JSON.parse(sessionData);
  } catch (e) {
    Sentry.captureException(e);
  }
  console.log(stepData);

  const isValidateStep = (step: string | null): step is T => {
    if (!step) return false;
    return step in validateStep;
  };

  const getInitialStep = () => {
    if (isValidateStep(urlStep) && validateStep[urlStep](stepData as K[T])) return urlStep;
    return initialStep;
  };

  const [step, setInternalStep] = useState<T>(getInitialStep);

  useEffect(() => {
    if (step === urlStep) return;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(QUERY_PARAM, step);
    router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  }, [urlStep, step, pathname, router, searchParams]);

  const setStep = (newStep: T, requiredData: K[T]) => {
    if (step === newStep) return;
    if (!validateStep[newStep](requiredData)) return;

    const newData = { ...stepData, ...requiredData };
    safeSessionStorage?.setItem(SESSION_KEY, JSON.stringify(newData));
    setInternalStep(newStep);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(QUERY_PARAM, newStep);
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const Funnel = (props: FunnelComponentProps<K, T>) => {
    return props[step]({ setStep, data: stepData as K[T] });
  };

  return [Funnel, setStep] as const;
};

export default useFunnel;
