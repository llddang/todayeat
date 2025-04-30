import { getMyMealCountByMonth, getMyMealsCount } from '@/apis/meal.api';
import { getAuth } from '@/apis/auth-server.api';
import AuthUserSummary from './auth-user-summary';
import { memo } from 'react';
import { getKoreaTime } from '@/utils/date.util';

const AppUseSummary = async () => {
  const { isAuthenticated } = await getAuth();

  if (isAuthenticated) {
    const today = getKoreaTime();
    const [allMealCount, thisMonthMealCount] = await Promise.all([getMyMealsCount(), getMyMealCountByMonth(today)]);

    return <AuthUserSummary allMealCount={allMealCount} thisMonthMealCount={thisMonthMealCount} today={today} />;
  }

  return null;
};

export default memo(AppUseSummary);
