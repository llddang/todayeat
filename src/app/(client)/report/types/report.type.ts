export const UnitEnum = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY'
} as const;

export type Unit = keyof typeof UnitEnum;

export type BarChartDataType = {
  label: string;
  value: number;
  fill: string;
};
