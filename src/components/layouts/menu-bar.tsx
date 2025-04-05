import SITE_MAP from '@/constants/site-map.constant';
import Link from 'next/link';

const MenuBar = () => {
  return (
    <footer className="fixed bottom-0 flex w-full items-center justify-around bg-yellow-100 py-4">
      {/* TODO - 페이지 명 정해지면 Link로 라우팅 */}
      <Link href={SITE_MAP.HOME}>
        <span>홈</span>
      </Link>
      <span>식사 기록</span>
      <span>리포트</span>
      <span>마이</span>
    </footer>
  );
};

export default MenuBar;
