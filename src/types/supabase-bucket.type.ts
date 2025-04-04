export const SupabaseBucket = {
  MEAL: 'meal',
  PROFILE_IMAGES: 'profile-images'
} as const;

export type SupabaseBucketKey = keyof typeof SupabaseBucket;
export type SupabaseBucketValue = (typeof SupabaseBucket)[SupabaseBucketKey];
