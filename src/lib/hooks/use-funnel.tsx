'use client';

import { ReactNode, useState, ReactElement } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const QUERY_PARAM = 'step';

const useFunnel = <T extends string>(initialStep: T) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlStep = searchParams.get(QUERY_PARAM) as T;
  const [step, setInternalStep] = useState<T>(urlStep || initialStep);

  const setStep = (newStep: T) => {
    if (step === newStep) return;
    setInternalStep(newStep);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(QUERY_PARAM, newStep);
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  type StepProps = {
    name: T;
    children: ReactNode;
  };
  const Step = ({ children }: StepProps) => {
    return <>{children}</>;
  };

  type FunnelProps = {
    children: ReactElement<StepProps>[];
  };
  const Funnel = ({ children }: FunnelProps) => {
    const currentStep = children.find((child) => child.props.name === step);
    return <>{currentStep}</>;
  };
  Funnel.step = Step;

  return [Funnel, setStep] as const;
};

export default useFunnel;
