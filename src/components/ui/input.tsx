import * as React from 'react';

import { cn } from '@/lib/shadcn';
import { useFormField } from '@/components/ui/form';

type InputProps = React.ComponentProps<'input'> & {
  measure?: string;
};

const InputVariants =
  ' flex h-12 items-center self-stretch gap-2 py-2 rounded-lg border-[1px] border-gray-200 bg-white px-4 focus-within:!border-gray-700 hover:border-gray-500';

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', measure, ...props }, ref) => {
  const { error } = useFormField();
  const isDisabled = props.disabled;

  return (
    <div className={cn(InputVariants, error && 'border-red-500', isDisabled && 'hover:border-gray-200', className)}>
      <input
        {...props}
        ref={ref}
        type={type}
        placeholder={props.placeholder}
        id={props.id}
        className="w-full min-w-0 flex-1 text-gray-900 caret-purple-300 typography-body1 placeholder:text-gray-500 focus:outline-none disabled:bg-white disabled:text-gray-500"
      />
      {measure && (
        <span className={cn('block typography-body3', isDisabled ? 'text-gray-500' : 'text-gray-700')}>{measure}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
