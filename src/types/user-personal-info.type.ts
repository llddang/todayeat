export const Gender = {
  MAN: 'MAN',
  WOMAN: 'WOMAN'
} as const;
export type GenderType = keyof typeof Gender;

export const ActivityLevel = {
  VERY_LOW: 'VERY_LOW',
  LOW: 'LOW',
  MODERATE: 'MODERATE',
  HIGH: 'HIGH',
  VERY_HIGH: 'VERY_HIGH'
} as const;
export type ActivityLevelType = keyof typeof ActivityLevel;

export const Purpose = {
  WEIGHT_LOSS: 'WEIGHT_LOSS',
  WEIGHT_MAINTENANCE: 'WEIGHT_MAINTENANCE',
  MUSCLE_GAIN: 'MUSCLE_GAIN'
} as const;
export type PurposeType = keyof typeof Purpose;
