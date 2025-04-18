import * as React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/shadcn';
const iconButtonVariants = cva(
  'flex items-center object-contain cursor-pointer  rounded-full justify-center flex-shrink-0 backdrop-blur-[10px] bg-no-repeat bg-center before:content-[""] before:bg-contain before:bg-no-repeat before:block ',
  {
    variants: {
      size: {
        sm: 'w-7 h-7 bg-white/80  hover:bg-gray-300/80 before:h-3 before:w-3 ',
        md: 'w-9 h-9 bg-white/80 aspect-square  hover:bg-gray-300/80 before:h-4 before:w-4',
        lg: 'w-10 h-10  bg-transparent hover:bg-gray-100 before:h-[1.375rem] before:w-[1.375rem]',
        xl: 'w-11 h-11 bg-white/80  hover:bg-gray-300/80 before:h-5 before:w-5 '
      }
    },
    defaultVariants: {
      size: 'lg'
    }
  }
);

export type IconButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> &
  VariantProps<typeof iconButtonVariants> & {
    alt: string;
    icon: string;
  };

// TODO - alt를 title로 변경
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size, icon, alt, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={props.type || 'button'}
        className={cn(icon, iconButtonVariants({ size }), className)}
        {...props}
      >
        <span className="sr-only">{alt}</span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
