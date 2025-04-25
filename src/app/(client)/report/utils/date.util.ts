import { PeriodUnit } from '../types/chart.type';

export const getDaysInUnit = (unit: PeriodUnit): number => {
  if (unit === 'DAILY') return 1;
  if (unit === 'WEEKLY') return 7;
  if (unit === 'MONTHLY') {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }
  return 1;
};
