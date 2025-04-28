/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { getSessionStorageItem, removeSessionStorageItem, setSessionStorageItem } from '@/utils/session-storage.util';
import useIsClient from './use-is-client';

const FUNNEL_QUERY_PARAM = 'step';
const DEFAULT_SESSION_ID = 'todayeat-funnel-data';

/**
 * 객체 타입에서 필수 키를 추출하는 타입
 * undefined가 될 수 없는 프로퍼티 키들을 추출
 */
type RequiredKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];

/**
 * 다음 스텝에만 있고 현재 스텝에는 없는 필수 키를 추출
 */
type NewRequiredKeys<TNext, TCurrent> = Exclude<RequiredKeys<TNext>, RequiredKeys<TCurrent>>;

/**
 * 다음 스텝으로 이동할 때 필요한 추가 필드 타입
 * 필수 필드는 반드시 포함, 선택적 필드는 선택적으로 포함
 */
type RequiredFieldsForNewStep<TNext, TCurrent> = Pick<TNext, NewRequiredKeys<TNext, TCurrent>> & Partial<TCurrent>;

/**
 * 객체가 비어있는지 확인하는 타입 (Record<string, never>인 경우 true)
 */
type IsEmptyObject<T> = T extends Record<string, never> ? true : false;

/**
 * 스텝 컴포넌트에 전달되는 props 타입
 * @template K - 각 스텝의 데이터 타입 매핑
 * @template Step - 모든 가능한 스텝 타입
 * @template CurrentStep - 현재 스텝 타입
 */
type StepComponentProps<K extends Record<string, unknown>, Step extends string, CurrentStep extends Step> = {
  setStep: {
    <NextStep extends Step>(nextStep: NextStep, data: RequiredFieldsForNewStep<K[NextStep], K[CurrentStep]>): void;
    <NextStep extends Step>(
      nextStep: NextStep
    ): IsEmptyObject<RequiredFieldsForNewStep<K[NextStep], K[CurrentStep]>> extends true ? void : never;
  };
  data: K[CurrentStep];
  clearFunnelData: () => void;
};

/**
 * Funnel 컴포넌트에 전달되는 props 타입
 * 각 스텝별 렌더링 함수를 매핑
 */
type FunnelComponentProps<K extends Record<string, unknown>, T extends Extract<keyof K, string>> = {
  [Step in T]: (props: StepComponentProps<K, T, Step>) => JSX.Element;
};

/**
 * useFunnel 훅의 반환 타입
 * Funnel 컴포넌트
 */
type UseFunnelReturnType<K extends Record<string, unknown>, T extends Extract<keyof K, string>> = {
  Funnel: (props: FunnelComponentProps<K, T>) => JSX.Element;
};

/**
 * 다단계 폼 프로세스(funnel)를 쉽게 관리하기 위한 커스텀 훅
 * URL 동기화, 세션 스토리지 저장 및 데이터 유효성 검사를 지원
 *
 * @param initialStep - 초기 스텝 값
 * @param validateStep - 각 스텝별 데이터 유효성 검사 함수 맵
 * @param sessionId - 세션 스토리지에 사용할 키 (기본값: 'todayeat-funnel-data')
 * @returns Funnel 컴포넌트
 */
const useFunnel = <K extends Record<string, unknown>, T extends Extract<keyof K, string>>(
  initialStep: T,
  validateStep: { [Step in T]: (data: K[Step]) => boolean },
  sessionId: string = DEFAULT_SESSION_ID
): UseFunnelReturnType<K, T> => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const stepInQueryParam = searchParams.get(FUNNEL_QUERY_PARAM) as T;

  const isValidStepName = (step: string | null): step is T => {
    if (!step) return false;
    return Object.keys(validateStep).includes(step);
  };

  const getInitialStep = (step: string, initialStep: T): T => {
    return isValidStepName(step) ? step : initialStep;
  };

  const currentStep = getInitialStep(stepInQueryParam, initialStep);

  const funnelDataRef = useRef<Partial<K[T]>>({});

  const isClient = useIsClient();

  if (isClient) {
    const funnelSessionData = getSessionStorageItem(sessionId, {} as K[T]);
    funnelDataRef.current = funnelSessionData;
  }

  useEffect(() => {
    const funnelSessionData = getSessionStorageItem(sessionId, {} as K[T]);

    if (!validateStep[currentStep](funnelSessionData)) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set(FUNNEL_QUERY_PARAM, initialStep);
      router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
    }
  }, []);

  useEffect(() => {
    if (currentStep === stepInQueryParam) return;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(FUNNEL_QUERY_PARAM, currentStep);
    router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  }, [currentStep, stepInQueryParam]);

  const clearFunnelData = () => {
    removeSessionStorageItem(sessionId);
    funnelDataRef.current = {};
  };

  const setStepImplementation = <NextStep extends T>(
    nextStep: NextStep,
    currentStepData: RequiredFieldsForNewStep<K[NextStep], K[typeof currentStep]>
  ): void => {
    if (currentStep === nextStep) return;

    const newData = { ...funnelDataRef.current, ...(currentStepData || {}) } as K[NextStep];

    if (!validateStep[nextStep](newData)) {
      alert('비정상적인 접근입니다.');
      console.error(`Invalid data for step ${nextStep} and ${newData}`);
      return;
    }

    funnelDataRef.current = newData;
    setSessionStorageItem(sessionId, newData);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(FUNNEL_QUERY_PARAM, nextStep);
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const setStep = setStepImplementation as typeof setStepImplementation & {
    <NextStep extends T>(
      nextStep: NextStep
    ): IsEmptyObject<RequiredFieldsForNewStep<K[NextStep], K[typeof currentStep]>> extends true ? void : never;
  };

  const Funnel = (props: FunnelComponentProps<K, T>) => {
    return props[currentStep]({ setStep, data: funnelDataRef.current as K[T], clearFunnelData });
  };

  return { Funnel };
};

export default useFunnel;
