export const PeriodUnitEnum = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY'
} as const;

export type PeriodUnit = keyof typeof PeriodUnitEnum;

export type BarChartDataType = {
  label: string;
  value: number;
  fill: string;
};
