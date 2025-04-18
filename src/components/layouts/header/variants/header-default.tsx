import Image from 'next/image';
import LOGO from '@/../public/logo.svg';
import Link from 'next/link';
import SITE_MAP from '@/constants/site-map.constant';
import HeaderLayer from '../header-wrapper';

const Header = () => {
  return (
    <HeaderLayer>
      <Link href={SITE_MAP.HOME}>
        <Image src={LOGO} alt="투데잇 로고" />
      </Link>
    </HeaderLayer>
  );
};

export default Header;
