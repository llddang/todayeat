import Responsive from '@/components/commons/responsive';
import MobileHeader, { MobileHeaderProps } from './mobile-header';
import PcHeader from './pc-header';

const Header = ({ variant = 'default' }: MobileHeaderProps) => {
  return <Responsive mobile={<MobileHeader variant={variant} />} pc={<PcHeader />} />;
};

export default Header;
