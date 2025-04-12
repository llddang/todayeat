import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'py-[0.625rem] inline-flex items-center justify-center gap-1 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'rounded-[3.125rem] px-6 bg-gray-900 text-gray-50 hover:bg-gray-800 disabled:text-gray-500 disabled:bg-opacity-5',
        secondary:
          'rounded-[3.125rem] px-6 bg-white border border-solid border-gray-350/40 hover:border-purple-10 hover:bg-button-gradient disabled:border-gray-200 disabled:bg-white disabled:text-gray-500',
        ghost: 'rounded-[3.125rem] px-6 text-gray-600 hover:text-gray-800 disabled:text-gray-400',
        icon: 'text-gray-600 hover:text-gray-800 disabled:text-gray-400 after:bg-no-repeat after:bg-center after:bg-right-line-gray-600-icon hover:after:bg-right-line-gray-800-icon disabled:after:bg-right-line-gray-400-icon'
      },
      size: {
        default: 'h-11 typography-subTitle4 ',
        sm: 'h-10 typography-subTitle4 gap-[0.125rem] after:w-4 after:h-4',
        lg: 'h-11 typography-subTitle2 gap-1 after:w-[1.125rem] after:h-[1.125rem]',
        icon: 'h-9 w-9'
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
