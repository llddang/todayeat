import useIsMobile from '@/hooks/use-is-mobile';
import { ReactNode } from 'react';

type ResponsiveProps = {
  pc: ReactNode;
  mobile: ReactNode;
};
const Responsive = ({ pc, mobile }: ResponsiveProps) => {
  const isMobile = useIsMobile();

  if (isMobile) return mobile;
  return pc;
};
export default Responsive;
