import GlassBackground from '@/components/commons/glass-background';
import Textarea from '@/components/commons/textarea';
import { Typography } from '@/components/ui/typography';
import React, { TextareaHTMLAttributes, forwardRef } from 'react';

type MemoBoxProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'maxLength'> & {
  maxLength: number;
};

const MemoBox = forwardRef<HTMLTextAreaElement, MemoBoxProps>(({ maxLength, ...props }, ref) => {
  return (
    <section className="flex flex-col gap-3">
      <Typography as="span" variant="body1" className="pl-1">
        식사 일기
      </Typography>
      <GlassBackground className="min-h-auto flex w-full flex-col gap-3 rounded-2xl border-none">
        <div className="flex items-start justify-between gap-[0.38rem] before:mt-[0.13rem] before:block before:aspect-square before:w-[1.125rem] before:bg-edit-4-icon before:bg-contain before:content-['']">
          <Typography as="span" variant="subTitle3" className="flex-1 !font-medium text-gray-600">
            음식을 먹을 때 어떤 기분이었는지 간단하게 적어주세요. 식습관을 돌아보는데 큰 도움이 돼요!
          </Typography>
        </div>
        <Textarea
          {...props}
          ref={ref}
          className="min-h-60 text-gray-500"
          maxLength={maxLength}
          placeholder="예시) 스트레스로 폭식했다, 기분 좋게 잘먹었다, 이 음식 먹고 속이 안 좋았다."
        />
      </GlassBackground>
    </section>
  );
});

MemoBox.displayName = 'MemoBox';

export default MemoBox;
