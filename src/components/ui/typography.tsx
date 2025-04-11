import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      title1: 'text-title1',
      title2: 'text-title2',
      subTitle1: 'text-subTitle1',
      subTitle2: 'text-subTitle2',
      subTitle3: 'text-subTitle3',
      subTitle4: 'text-subTitle4',
      subTitle5: 'text-subTitle5',
      body1: 'text-body1',
      body2: 'text-body2',
      body3: 'text-body3',
      body4: 'text-body4',
      caption1: 'text-caption1',
      caption2: 'text-caption2',
      caption3: 'text-caption3'
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
