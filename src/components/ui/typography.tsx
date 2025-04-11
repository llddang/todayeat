import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      title1: 'typography-title1',
      title2: 'typography-title2',
      subTitle1: 'typography-subTitle1',
      subTitle2: 'typography-subTitle2',
      subTitle3: 'typography-subTitle3',
      subTitle4: 'typography-subTitle4',
      subTitle5: 'typography-subTitle5',
      body1: 'typography-body1',
      body2: 'typography-body2',
      body3: 'typography-body3',
      body4: 'typography-body4',
      caption1: 'typography-caption1',
      caption2: 'typography-caption2',
      caption3: 'typography-caption3'
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
