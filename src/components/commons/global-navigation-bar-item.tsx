import Link from 'next/link';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/ui/typography';

const gnbItemStyle = cva(
  'flex items-center text-center justify-center gap-2 p-2 rounded-[1.5625rem] transition-color before:content-[""] before:block before:w-[1.375rem] before:h-[1.375rem] before:bg-contain before:bg-no-repeat before:bg-center',
  {
    variants: {
      active: {
        true: 'bg-white text-gray-900',
        false: 'text-gray-550'
      }
    },
    defaultVariants: {
      active: false
    }
  }
);

type GnbItemProps = {
  href: string;
  icon: string;
  label: string;
  active: boolean;
};

const GlobalNavigationBarItem = ({ href, icon, label, active }: GnbItemProps) => (
  <Link href={href} className={cn(gnbItemStyle({ active }), icon)}>
    <Typography as="span" variant="subTitle5" className="!leading-none">
      {label}
    </Typography>
  </Link>
);

export default GlobalNavigationBarItem;
