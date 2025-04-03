export const SupabaseBucket = {
  MEAL: 'meal',
  PROFILE_IMAGE: 'profile-image'
} as const;

export type SupabaseBucketType = keyof typeof SupabaseBucket;
export type SupabaseBucketValue = (typeof SupabaseBucket)[keyof typeof SupabaseBucket];
