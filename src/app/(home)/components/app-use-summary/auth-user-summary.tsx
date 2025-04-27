'use client';

import { differenceInDays, getDaysInMonth } from 'date-fns';
import { useUserStore } from '@/store/user-store';
import GlassBackground from '@/components/commons/glass-background';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/shadcn';
import { getPercentage } from '@/utils/nutrition-calculator.util';
import React from 'react';

type AuthUserSummaryProps = {
  allMealCount: number;
  thisMonthMealCount: number;
};
const AuthUserSummary = ({ allMealCount, thisMonthMealCount }: AuthUserSummaryProps) => {
  const user = useUserStore((state) => state.user);

  const today = new Date();

  const daysDiff = differenceInDays(today, user.createdAt) || 0;
  const percent = getPercentage(thisMonthMealCount, getDaysInMonth(today));

  return (
    <GlassBackground
      className={cn(
        'hidden min-h-0 space-y-4 overflow-hidden rounded-[2rem] p-6 xl:block',
        "before:absolute before:-bottom-0.5 before:right-2.5 before:aspect-square before:w-[4.375rem] before:content-['']",
        'before:bg-career-illustration before:bg-contain before:bg-center before:bg-no-repeat'
      )}
    >
      <Typography variant="title3" className="text-gray-800">
        안녕하세요, {user.nickname}님!
      </Typography>
      <div className="space-y-1">
        <Typography variant="body1" className="flex gap-1 text-gray-800">
          🗓️ 투데잇과 함께한 지
          <Typography as="span" variant="subTitle2" className="text-gray-900">
            {daysDiff}일,
          </Typography>
        </Typography>
        <Typography variant="body1" className="flex gap-1 text-gray-800">
          🍽️ 지금까지
          <Typography as="span" variant="subTitle2" className="text-gray-900">
            {allMealCount}끼
          </Typography>
          식사를 기록했어요
        </Typography>
        <Typography variant="body1" className="flex gap-1 text-gray-800">
          🙌 이번 달은
          <Typography as="span" variant="subTitle2" className="text-gray-900">
            {percent}%
          </Typography>
          기록 중이에요
        </Typography>
      </div>
    </GlassBackground>
  );
};

export default React.memo(AuthUserSummary);
