/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import * as Sentry from '@sentry/nextjs';

const QUERY_PARAM = 'step';

type RequiredKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];
type NewRequiredKeys<T, U> = Exclude<RequiredKeys<T>, RequiredKeys<U>>;
type RequiredFieldsForNewStep<TNext, TCurrent> = Pick<TNext, NewRequiredKeys<TNext, TCurrent>>;
type IsEmptyObject<T> = T extends Record<string, never> ? true : false;
type FunnelComponentProps<K extends Record<string, any>, T extends Extract<keyof K, string>> = {
  [Step in T]: (props: {
    setStep: {
      <NextStep extends T>(nextStep: NextStep, data: RequiredFieldsForNewStep<K[NextStep], K[Step]>): void;
      <NextStep extends T>(
        nextStep: NextStep
      ): IsEmptyObject<RequiredFieldsForNewStep<K[NextStep], K[Step]>> extends true ? void : never;
    };
    data: K[Step];
  }) => JSX.Element;
};

type UseFunnelReturnType<K extends Record<string, any>, T extends Extract<keyof K, string>> = readonly [
  (props: FunnelComponentProps<K, T>) => JSX.Element,
  {
    <NextStep extends T>(nextStep: NextStep, data: RequiredFieldsForNewStep<K[NextStep], K[T]>): void;
    <NextStep extends T>(
      nextStep: NextStep
    ): IsEmptyObject<RequiredFieldsForNewStep<K[NextStep], K[T]>> extends true ? void : never;
  }
];

const useFunnel = <K extends Record<string, any>, T extends Extract<keyof K, string>>(
  initialStep: T,
  validateStep: Record<T, (data: K[T]) => boolean>,
  sessionId: string = 'todayeat-funnel-data',
  initialData?: Partial<K[T]>
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
    if (isValidateStep(urlStep)) return urlStep;
    return initialStep;
  };

  const [step, setInternalStep] = useState<T>(getInitialStep);
  const [stepData, setStepData] = useState<Partial<K[T]>>();

  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;

    try {
      const sessionData = window?.sessionStorage.getItem(sessionId) ?? '{}';
      const parsedData = JSON.parse(sessionData);
      const newData = { ...initialData, ...parsedData } as K[T];
      setStepData(newData);
      if (!validateStep[urlStep](newData)) setInternalStep(initialStep);
    } catch (e) {
      Sentry.captureException(e);
    }

    initialized.current = true;
  }, [initialData, initialStep, urlStep, sessionId, validateStep]);

  useEffect(() => {
    if (step === urlStep) return;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(QUERY_PARAM, step);
    router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  }, [urlStep, step, pathname, router, searchParams]);

  function setStepImplementation<NextStep extends T>(
    nextStep: NextStep,
    requiredData?: RequiredFieldsForNewStep<K[NextStep], K[typeof step]>
  ): void {
    if (step === nextStep) return;

    const newData = { ...stepData, ...(requiredData || {}) } as K[NextStep];

    if (!validateStep[nextStep](newData)) return;
    setStepData(newData);

    window?.sessionStorage.setItem(sessionId, JSON.stringify(newData));
    setInternalStep(nextStep);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(QUERY_PARAM, nextStep);
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  }

  const setStep = setStepImplementation as typeof setStepImplementation & {
    <NextStep extends T>(
      nextStep: NextStep
    ): IsEmptyObject<RequiredFieldsForNewStep<K[NextStep], K[typeof step]>> extends true ? void : never;
  };

  const Funnel = (props: FunnelComponentProps<K, T>) => {
    return props[step]({ setStep, data: stepData as K[T] });
  };

  return [Funnel, setStep] as const;
};

export default useFunnel;
