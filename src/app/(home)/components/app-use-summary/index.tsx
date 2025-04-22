import { getMyMealCountByMonth, getMyMealsCount } from '@/apis/meal.api';
import React from 'react';
import { getAuth } from '@/apis/auth-server.api';
import AuthUserSummary from './auth-user-summary';

const AppUseSummary = async () => {
  const { isAuthenticated } = await getAuth();

  if (isAuthenticated) {
    const today = new Date();
    const [allMealCount, thisMonthMealCount] = await Promise.all([getMyMealsCount(), getMyMealCountByMonth(today)]);

    return <AuthUserSummary allMealCount={allMealCount} thisMonthMealCount={thisMonthMealCount} />;
  }

  // TODO: 비인가 회원에게 보여줄 내용 만들기
  return null;
};

export default React.memo(AppUseSummary);
