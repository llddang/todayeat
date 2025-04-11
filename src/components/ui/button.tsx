import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 whitespace-nowrap text-sm font-semibold tracking-[-0.02em] leading-[140%] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'rounded-[3.125rem] px-6 bg-gray-900 text-gray-50 hover:bg-gray-800 disabled:text-gray-500 disabled:bg-[#515151]/5',
        secondary:
          'rounded-[3.125rem] px-6 bg-white border border-solid border-[#E0E0E0]/40 hover:border-purple-10 hover:bg-button-gradient disabled:border-gray-200 disabled:bg-white disabled:text-gray-500',
        ghost: 'rounded-[3.125rem] px-6 text-gray-600 hover:text-gray-800 disabled:text-gray-400',
        icon: 'text-gray-600 hover:text-gray-800 disabled:text-gray-400 after:bg-no-repeat after:bg-center after:bg-right-line-gray-600-icon hover:after:bg-right-line-gray-800-icon disabled:after:bg-right-line-gray-400-icon'
      },
      size: {
        default: 'h-11',
        sm: 'h-10 text-sm gap-[0.125rem] after:w-4 after:h-4',
        lg: 'h-11 text-base gap-1 after:w-[1.125rem] after:h-[1.125rem]'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
