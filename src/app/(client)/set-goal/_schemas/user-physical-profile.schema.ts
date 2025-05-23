import { z } from 'zod';

export const userPhysicalProfileSchema = z.object({
  gender: z.enum(['MAN', 'WOMAN']),
  height: z.number().positive(),
  weight: z.number().positive(),
  age: z.number().int().positive(),
  activityLevel: z.enum(['VERY_LOW', 'LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']),
  purpose: z.enum(['WEIGHT_LOSS', 'WEIGHT_MAINTENANCE', 'MUSCLE_GAIN'])
});
