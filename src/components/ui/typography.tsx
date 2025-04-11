import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      title1: 'text-4xl/[122%] font-bold tracking-[-0.02em]',
      title2: 'text-xl/[136%] font-[650] tracking-[-0.02em]',
      subTitle1: 'text-lg/[140%] font-semibold tracking-[-0.02em]',
      subTitle2: 'text-base/[140%] font-semibold tracking-[-0.02em]',
      subTitle3: 'text-[0.9375rem]/[140%] font-semibold tracking-[-0.02em]',
      subTitle4: 'text-sm/[140%] font-semibold tracking-[-0.02em]',
      subTitle5: 'text-[0.8125rem]/[140%] font-semibold tracking-[-0.02em]',
      body1: 'text-base/[140%] font-[450] tracking-[-0.02em]',
      body2: 'text-[0.9375rem]/[140%] font-[450] tracking-[-0.02em]',
      body3: 'text-sm/[140%] font-[450] tracking-[-0.02em]',
      body4: 'text-[0.8125rem]/[140%] font-[450] tracking-[-0.01em]',
      caption1: 'text-[0.8125rem]/[140%] font-medium tracking-[-0.02em]',
      caption2: 'text-xs/[140%] font-medium tracking-[-0.01em]',
      caption3: 'text-xs/[140%] font-[650] tracking-[-0.02rem]'
    }
  },
  defaultVariants: {
    variant: 'body1'
  }
});

type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';

type TypographyProps<T extends TextElement = 'p'> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof typographyVariants> &
  Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children'>;

export function Typography<T extends TextElement = 'p'>({
  as,
  children,
  className,
  variant,
  ...props
}: TypographyProps<T>) {
  const Component = as || 'p';
  return (
    <Component className={cn(typographyVariants({ variant }), className)} {...props}>
      {children}
    </Component>
  );
}
