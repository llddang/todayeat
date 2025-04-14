import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { HomeIcon, ImageIcon, BarChart3Icon } from 'lucide-react';

type Page = 'home' | 'record' | 'report';

type GnbBarProps = {
  currentPage: Page;
};

const gnbItem = cva('flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors', {
  variants: {
    active: {
      true: 'bg-white text-black font-semibold',
      false: 'text-gray-400'
    }
  },
  defaultVariants: {
    active: false
  }
});

const items = [
  { page: 'home', label: '홈', icon: <HomeIcon className="h-5 w-5" /> },
  { page: 'record', label: '식사 기록', icon: <ImageIcon className="h-5 w-5" /> },
  { page: 'report', label: '리포트', icon: <BarChart3Icon className="h-5 w-5" /> }
] as const;

const GlobalNavigationBar = ({ currentPage }: GnbBarProps) => {
  return (
    <nav className="fixed bottom-0 flex w-full justify-around rounded-t-3xl bg-gray-100 px-4 py-3">
      {items.map(({ page, label, icon }) => (
        <button key={page} className={cn(gnbItem({ active: currentPage === page }))}>
          {icon}
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default GlobalNavigationBar;
