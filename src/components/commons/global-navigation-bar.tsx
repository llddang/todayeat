'use client';

import { usePathname } from 'next/navigation';
import GlobalNavigationBarItem from '@/components/commons/global-navigation-bar-item';
import SITE_MAP from '@/constants/site-map.constant';

const HOME = 'home';
const REPORT = 'report';
const POST = 'post';

const GlobalNavigationBar = () => {
  const pathname = usePathname();

  const currentPage = pathname.startsWith(SITE_MAP.MEAL_POST)
    ? POST
    : pathname.startsWith(SITE_MAP.REPORT)
      ? REPORT
      : HOME;

  return (
    <nav className="flex justify-around rounded-[6.25rem] bg-gray-200/[0.64] p-2">
      <GlobalNavigationBarItem
        href={SITE_MAP.HOME}
        label="홈"
        icon={currentPage === HOME ? 'before:bg-home-fill-icon' : 'before:bg-home-line-icon'}
        active={currentPage === HOME}
      />
      <GlobalNavigationBarItem
        href={SITE_MAP.MEAL_POST}
        label="식사 기록"
        icon={currentPage === POST ? 'before:bg-analyze-fill-icon' : 'before:bg-analyze-line-icon'}
        active={currentPage === POST}
      />
      <GlobalNavigationBarItem
        href={SITE_MAP.REPORT}
        label="리포트"
        icon={currentPage === REPORT ? 'before:bg-chart-fill-icon' : 'before:bg-chart-line-icon'}
        active={currentPage === REPORT}
      />
    </nav>
  );
};

export default GlobalNavigationBar;
