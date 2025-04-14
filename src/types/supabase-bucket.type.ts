export const SupabaseBucket = {
  MEAL: 'meal',
  MEAL_REQUESTS: 'meal-requests',
  PROFILE_IMAGES: 'profile-images'
} as const;

export type SupabaseBucketKey = keyof typeof SupabaseBucket;
export type SupabaseBucketValue = (typeof SupabaseBucket)[SupabaseBucketKey];
