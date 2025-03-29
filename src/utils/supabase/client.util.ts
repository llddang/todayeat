import { createBrowserClient } from '@supabase/ssr';
import ENV from '@/constants/env.constant';
import ENV_ERROR from '@/constants/env-error.constant';

export const getBrowserClient = () => {
  if (!ENV.SUPABASE_URL) throw new Error(ENV_ERROR.SUPABASE_URL);
  if (!ENV.SUPABASE_ANON_KEY) throw new Error(ENV_ERROR.SUPABASE_ANON_KEY);

  return createBrowserClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);
};
export const browserClient = getBrowserClient();
