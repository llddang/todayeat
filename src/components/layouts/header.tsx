import Link from 'next/link';
import BackButton from './header-backbutton';
import SITE_MAP from '@/constants/site-map.constant';

const Header = async () => {
  return (
    <header className="relative flex justify-center bg-yellow-100 p-4">
      <BackButton />
      <Link href={SITE_MAP.HOME} className="text-lg font-bold">
        투데잇
      </Link>
    </header>
  );
};

export default Header;
