'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

const buttonLinkVariants = cva(
  'py-[0.625rem] inline-flex items-center justify-center gap-1 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'rounded-[3.125rem] px-6 bg-gray-900 text-gray-50 hover:bg-gray-800',
        secondary:
          'rounded-[3.125rem] px-6 text-gray-900 bg-white border border-solid border-gray-350/40 hover:border-purple-10 hover:bg-button-gradient',
        ghost: 'rounded-[3.125rem] px-6 text-gray-600 hover:text-gray-800 ',
        icon: 'text-gray-600 hover:text-gray-800 after:bg-no-repeat after:bg-center after:bg-right-line-gray-600-icon hover:after:bg-right-line-gray-800-icon'
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

const buttonLinkDisabledVariants = cva(
  'py-[0.625rem] inline-flex items-center justify-center gap-1 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'rounded-[3.125rem] px-6 bg-gray-900/5 text-gray-500',
        secondary: 'rounded-[3.125rem] px-6 bg-white border border-solid border-gray-200 text-gray-500',
        ghost: 'rounded-[3.125rem] px-6 text-gray-400',
        icon: 'text-gray-400 after:bg-no-repeat after:bg-center after:bg-right-line-gray-400-icon'
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

export type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonLinkVariants> & {
    href: string;
    disabled?: boolean;
    prefetch?: boolean;
    children: React.ReactNode;
    className?: string;
  };

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, href, disabled = false, prefetch, children, ...props }, ref) => {
    if (disabled) {
      return (
        <span
          className={cn(buttonLinkDisabledVariants({ variant, size, className }))}
          ref={ref as React.Ref<HTMLSpanElement>}
          {...props}
        >
          {children}
        </span>
      );
    }

    return (
      <Link
        className={cn(buttonLinkVariants({ variant, size, className }))}
        ref={ref}
        href={href}
        prefetch={prefetch}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
export default ButtonLink;
