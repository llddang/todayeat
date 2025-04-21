'use client';

import { usePathname } from 'next/navigation';
import GlobalNavigationBarItem from './item';
import SITE_MAP from '@/constants/site-map.constant';
import { cn } from '@/lib/shadcn';

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
    <nav
      className={cn(
        'fixed bottom-4 left-4 right-4 rounded-[6.25rem] bg-gray-200/[0.64] p-2 backdrop-blur-[30px]',
        'left-1/2 right-0 !m-0 w-full -translate-x-1/2 temp-layout'
      )}
    >
      <ul className="flex gap-2">
        <li className="flex-1">
          <GlobalNavigationBarItem
            href={SITE_MAP.HOME}
            label="홈"
            icon={currentPage === HOME ? 'before:bg-home-fill-icon' : 'before:bg-home-line-icon'}
            active={currentPage === HOME}
          />
        </li>
        <li className="flex-1">
          <GlobalNavigationBarItem
            href={SITE_MAP.MEAL_POST}
            label="식사 기록"
            icon={currentPage === POST ? 'before:bg-analyze-fill-icon' : 'before:bg-analyze-line-icon'}
            active={currentPage === POST}
          />
        </li>
        <li className="flex-1">
          <GlobalNavigationBarItem
            href={SITE_MAP.REPORT}
            label="리포트"
            icon={currentPage === REPORT ? 'before:bg-chart-fill-icon' : 'before:bg-chart-line-icon'}
            active={currentPage === REPORT}
          />
        </li>
      </ul>
    </nav>
  );
};

export default GlobalNavigationBar;
