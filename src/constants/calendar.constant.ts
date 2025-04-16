export const CALENDAR_STAND_COUNT = 6;
export const CALENDAR_RANGE_OFFSET: readonly number[] = Array.from(
  { length: CALENDAR_STAND_COUNT * 2 + 1 },
  (_, i) => i - CALENDAR_STAND_COUNT
);

export const SEC = 1000;
export const MIN = 60 * SEC;
export const HOUR = 60 * MIN;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;

export const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];
export const MAX_WEEK = 6;
