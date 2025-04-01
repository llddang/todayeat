const ENV = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  PROJECT_URL: process.env.NEXT_PUBLIC_PROJECT_URL || '',
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN || ''
} as const;
export default ENV;
