export const isSameDate = (d1: Date, d2: Date): boolean => d1.toDateString() === d2.toDateString();

export const getWeekDates = (date: Date): { id: number; dates: Date[] }[] => {
  const WEEK_INDEX = [-2, -1, 0, 1, 2] as const;
  const WEEK = 7 * 24 * 60 * 60 * 1000;

  const standTime = date.getTime();

  const allWeeks = WEEK_INDEX.map((weekOffset) => ({
    id: weekOffset,
    dates: calculateWeekDates(new Date(standTime + weekOffset * WEEK))
  }));

  return allWeeks;
};

export const calculateWeekDates = (date: Date): Date[] => {
  const DAY = 24 * 60 * 60 * 1000;

  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date);
  monday.setDate(diff);

  const standTime = monday.getTime();

  return Array.from({ length: 7 }, (_, dayOffset) => new Date(standTime + dayOffset * DAY));
};
