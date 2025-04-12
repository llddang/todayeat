import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
const iconButtonVariants = cva(
  'flex items-center cursor-pointer rounded-full justify-center flex-shrink-0 backdrop-blur-[10px]',
  {
    variants: {
      size: {
        sm: 'w-7 h-7  bg-white/80  hover:bg-gray-300/80 ',
        md: 'w-9 h-9 bg-white/80 aspect-square  hover:bg-gray-300/80',
        lg: 'w-10 h-10  bg-transparent hover:bg-gray-100',
        xl: 'w-11 h-11 bg-white/80  hover:bg-gray-300/80 '
      }
    },
    defaultVariants: {
      size: 'sm'
    }
  }
);

const iconImageVariants = cva('object-cover', {
  variants: {
    size: {
      sm: 'w-3 h-3 ',
      md: 'w-4 h-4',
      lg: 'w-[1.375rem] h-[1.375rem]',
      xl: 'w-5 h-5'
    }
  },
  defaultVariants: {
    size: 'sm'
  }
});

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButtonVariants> & {
    alt: string;
    icon: StaticImageData;
  };

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ alt, size, icon, className, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(iconButtonVariants({ size }), className)} {...props}>
        <Image src={icon} alt={alt} className={iconImageVariants({ size })} />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton, iconButtonVariants };
