export const ENV = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  PROJECT_URL: process.env.NEXT_PUBLIC_PROJECT_URL || '',
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
  GEMINI_KEY: process.env.NEXT_PUBLIC_GEMINI_KEY || ''
} as const;

export const ENV_ERROR = {
  SUPABASE_URL: 'SUPABASE_URL 환경변수가 설정되지 않았습니다.',
  SUPABASE_ANON_KEY: 'SUPABASE_ANON_KEY 환경변수가 설정되지 않았습니다.',
  PROJECT_URL: 'PROJECT_URL 환경변수가 설정되지 않았습니다.',
  SENTRY_DSN: 'SENTRY_DSN 환경변수가 설정되지 않았습니다.',
  GEMINI_KEY: 'GEMINI_KEY 환경변수가 설정되지 않았습니다.'
} as const;
