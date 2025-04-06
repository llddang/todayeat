'use client';

import SITE_MAP from '@/constants/site-map.constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MenuBar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const emphasizeClass = (path: string) => (isActive(path) ? 'font-bold text-xl' : '');

  return (
    <nav className="fixed bottom-0 w-full bg-yellow-100 py-4">
      <ul className="flex items-center justify-around text-sm">
        <li>
          <Link href={SITE_MAP.HOME}>
            <span className={emphasizeClass(SITE_MAP.HOME)}>홈</span>
          </Link>
        </li>
        <li>
          <Link href={SITE_MAP.MEAL_POST}>
            <span className={emphasizeClass(SITE_MAP.MEAL_POST)}>식단 기록</span>
          </Link>
        </li>
        <li>
          <Link href={SITE_MAP.REPORT}>
            <span className={emphasizeClass(SITE_MAP.REPORT)}>리포트</span>
          </Link>
        </li>
        <li>
          <Link href={SITE_MAP.MY_PAGE}>
            <span className={emphasizeClass(SITE_MAP.MY_PAGE)}>마이</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;
