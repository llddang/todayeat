const ENV = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  PROJECT_URL: process.env.NEXT_PUBLIC_PROJECT_URL || ''
} as const;
export default ENV;
