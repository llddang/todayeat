'use client';

import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import * as React from 'react';

type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'maxLength'> & {
  maxLength: number;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxLength, ...props }, forwardedRef) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    
    const initialCharCount =
      typeof props.defaultValue === 'string' || typeof props.defaultValue === 'number'
        ? String(props.defaultValue).length
        : 0;

    const [charCount, setCharCount] = React.useState<number>(initialCharCount);

    React.useImperativeHandle(forwardedRef, () => textareaRef.current!, []);

    const handleInput = () => {
      const length = textareaRef.current?.value.length ?? 0;
      setCharCount(length);
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
          className="flex-1 resize-none caret-purple-300 typography-body1 focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0"
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
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
