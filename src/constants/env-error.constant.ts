const ENV_ERROR = {
  SUPABASE_URL: 'SUPABASE_URL 환경변수가 설정되지 않았습니다.',
  SUPABASE_ANON_KEY: 'SUPABASE_ANON_KEY 환경변수가 설정되지 않았습니다.',
  PROJECT_URL: 'PROJECT_URL 환경변수가 설정되지 않았습니다.'
} as const;
export default ENV_ERROR;
