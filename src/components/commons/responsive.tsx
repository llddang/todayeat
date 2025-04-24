'use client';

import useIsMobile from '@/hooks/use-is-mobile';
import { ReactNode } from 'react';

type ResponsiveProps = {
  pc: ReactNode;
  mobile: ReactNode;
  mode?: 'css' | 'js';
};
const Responsive = ({ pc, mobile, mode = 'css' }: ResponsiveProps) => {
  const isMobile = useIsMobile();

  if (mode === 'css')
    return (
      <>
        <div className="xl:hidden">{mobile}</div>
        <div className="hidden xl:block">{pc}</div>
      </>
    );

  if (isMobile) return mobile;
  return pc;
};
export default Responsive;
