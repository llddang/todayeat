/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';
import { FUNNEL_QUERY_PARAM } from '@/constants/common.constant';
import { isClient, isServer } from '@/lib/utils/predicate.util';

// 세션 스토리지 기본 키값
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
type StepComponentProps<K extends Record<string, any>, Step extends string, CurrentStep extends Step> = {
  setStep: {
    <NextStep extends Step>(nextStep: NextStep, data: RequiredFieldsForNewStep<K[NextStep], K[CurrentStep]>): void;
    <NextStep extends Step>(
      nextStep: NextStep
    ): IsEmptyObject<RequiredFieldsForNewStep<K[NextStep], K[CurrentStep]>> extends true ? void : never;
  };
  data: K[CurrentStep];
};

/**
 * Funnel 컴포넌트에 전달되는 props 타입
 * 각 스텝별 렌더링 함수를 매핑
 */
type FunnelComponentProps<K extends Record<string, any>, T extends Extract<keyof K, string>> = {
  [Step in T]: (props: StepComponentProps<K, T, Step>) => JSX.Element;
};

/**
 * useFunnel 훅의 반환 타입
 * Funnel 컴포넌트
 */
type UseFunnelReturnType<K extends Record<string, any>, T extends Extract<keyof K, string>> = (
  props: FunnelComponentProps<K, T>
) => JSX.Element;

/**
 * 다단계 폼 프로세스(funnel)를 쉽게 관리하기 위한 커스텀 훅
 * URL 동기화, 세션 스토리지 저장 및 데이터 유효성 검사를 지원
 *
 * @param initialStep - 초기 스텝 값
 * @param validateStep - 각 스텝별 데이터 유효성 검사 함수 맵
 * @param sessionId - 세션 스토리지에 사용할 키 (기본값: 'todayeat-funnel-data')
 * @returns Funnel 컴포넌트
 */
const useFunnel = <K extends Record<string, any>, T extends Extract<keyof K, string>>(
  initialStep: T,
  validateStep: Record<T, (data: K[T]) => boolean>,
  sessionId: string = DEFAULT_SESSION_ID
): UseFunnelReturnType<K, T> => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlStep = searchParams.get(FUNNEL_QUERY_PARAM) as T;

  /**
   * 문자열이 유효한 스텝인지 확인하는 함수
   * validateStep 객체의 키로 존재하는지 체크
   */
  const isValidStep = useCallback(
    (step: string | null): step is T => {
      if (!step) return false;
      return Object.keys(validateStep).includes(step);
    },
    [validateStep]
  );

  /**
   * 초기 스텝을 결정하는 함수
   * URL에 유효한 스텝이 있으면 해당 값 사용, 없으면 초기값 사용
   */
  const getInitialStep = (step: string): T => {
    return isValidStep(step) ? step : initialStep;
  };

  const step = getInitialStep(urlStep);

  const [stepData, setStepData] = useState<Partial<K[T]>>({});

  const initialized = useRef(false);

  /**
   * 세션 스토리지에서 데이터를 초기화하는 효과
   * 컴포넌트 마운트 시 한 번만 실행
   */
  useEffect(() => {
    if (initialized.current) return;

    try {
      if (isServer()) return;

      const sessionData = sessionStorage.getItem(sessionId) ?? '{}';
      const parsedData = JSON.parse(sessionData) as K[T];

      setStepData(parsedData);

      if (!validateStep[step](parsedData)) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set(FUNNEL_QUERY_PARAM, initialStep);
        router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
      }
    } catch (error) {
      Sentry.captureException('Failed to initialize funnel data:' + error);
    }

    initialized.current = true;
  }, [initialStep, step, sessionId, validateStep, searchParams, router, pathname]);

  /**
   * 현재 스텝이 변경될 때 URL을 동기화하는 효과
   */
  useEffect(() => {
    if (step === urlStep) return;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(FUNNEL_QUERY_PARAM, step);
    router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  }, [step, urlStep, pathname, router, searchParams]);

  /**
   * 다음 스텝으로 이동하는 내부 구현 함수
   * 데이터 유효성 검사, 세션 스토리지 저장, URL 업데이트 수행
   *
   * @param nextStep - 이동할 다음 스텝
   * @param requiredData - 다음 스텝으로 넘어가기 위한 필요한 추가 데이터
   */
  function setStepImplementation<NextStep extends T>(
    nextStep: NextStep,
    requiredData: RequiredFieldsForNewStep<K[NextStep], K[typeof step]>
  ): void {
    if (step === nextStep) return;

    const newData = { ...stepData, ...(requiredData || {}) } as K[NextStep];

    // 다음 스텝 데이터 유효성 검사
    if (!validateStep[nextStep](newData)) {
      console.warn(`Invalid data for step ${nextStep}`);
      return;
    }

    setStepData(newData);

    // 세션 스토리지에 데이터 저장
    if (isClient()) sessionStorage.setItem(sessionId, JSON.stringify(newData));

    // URL 업데이트
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(FUNNEL_QUERY_PARAM, nextStep);
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  }

  /**
   * 외부에 노출되는 setStep 함수
   * 타입 시스템이 다음 스텝으로 이동 시 필요한 데이터를 추론하도록 함
   */
  const setStep = setStepImplementation as typeof setStepImplementation & {
    <NextStep extends T>(
      nextStep: NextStep
    ): IsEmptyObject<RequiredFieldsForNewStep<K[NextStep], K[typeof step]>> extends true ? void : never;
  };

  /**
   * 현재 스텝에 해당하는 컴포넌트를 렌더링하는 Funnel 컴포넌트
   * 각 스텝 컴포넌트에 setStep 함수와 현재 데이터를 전달
   *
   * @param props - 각 스텝별 렌더링 함수를 포함하는 객체
   * @returns 현재 스텝에 해당하는 JSX 요소
   */
  const Funnel = (props: FunnelComponentProps<K, T>) => {
    return props[step]({ setStep, data: stepData as K[T] });
  };

  return Funnel;
};

export default useFunnel;
