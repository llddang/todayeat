export const SupabaseBucket = {
  MEAL: 'meal',
  PROFILE_IMAGE: 'profile-image'
} as const;

export type SupabaseBucketKey = keyof typeof SupabaseBucket;
export type SupabaseBucketValue = (typeof SupabaseBucket)[SupabaseBucketKey];
