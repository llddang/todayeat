'use client';

import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { FormEvent, forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';

type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'maxLength'> & {
  maxLength: number;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, maxLength, ...props }, forwardedRef) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const initialCharCount = useMemo(() => {
    if (typeof props.defaultValue === 'string' || typeof props.defaultValue === 'number') {
      return String(props.defaultValue).length;
    }
    return 0;
  }, [props.defaultValue]);

  const [charCount, setCharCount] = useState<number>(initialCharCount);

  useImperativeHandle(forwardedRef, () => textareaRef.current!, []);

  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const length = e.currentTarget.value.length ?? 0;
    setCharCount(length);
    props.onInput?.(e);
  };

  const handleContainerClick = () => {
    textareaRef.current?.focus();
  };

  return (
    <div
      onClick={handleContainerClick}
      className={cn(
        'group flex flex-col gap-2 rounded-lg border border-gray-300 bg-white p-4 focus-within:!border-gray-800 hover:border-gray-500',
        className
      )}
    >
      <textarea
        className="flex-1 resize-none caret-purple-300 typography-body1 focus:border-none focus:text-gray-900 focus:outline-none focus:ring-0 focus-visible:ring-0"
        maxLength={maxLength}
        ref={textareaRef}
        onInput={handleInput}
        {...props}
      />

      <div className="flex items-center justify-end gap-0.5">
        <Typography as="span" variant="body4" className="text-gray-600">
          {charCount}
        </Typography>
        <Typography as="span" variant="body4" className="text-gray-500">
          /
        </Typography>
        <Typography as="span" variant="body4" className="text-gray-500">
          {maxLength}
        </Typography>
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
