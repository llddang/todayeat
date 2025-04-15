import { z } from 'zod';

export const SET_GOAL_FUNNEL_SCHEMA = z.object({
  purpose: z.enum(['WEIGHT_LOSS', 'WEIGHT_MAINTENANCE', 'MUSCLE_GAIN']),
  gender: z.enum(['MAN', 'WOMAN']),
  age: z.number().positive(),
  height: z.number().positive(),
  weight: z.number().positive(),
  activityLevel: z.enum(['VERY_LOW', 'LOW', 'MODERATE', 'HIGH', 'VERY_HIGH'])
});
