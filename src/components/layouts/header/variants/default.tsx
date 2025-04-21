import Image from 'next/image';
import LOGO from '@/../public/logo.svg';
import Link from 'next/link';
import SITE_MAP from '@/constants/site-map.constant';

const Default = () => {
  return (
    <Link href={SITE_MAP.HOME}>
      <Image src={LOGO} alt="투데잇 로고" />
    </Link>
  );
};

export default Default;
