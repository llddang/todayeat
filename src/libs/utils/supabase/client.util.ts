import ENV from '@/constants/env.constant';
import { createBrowserClient } from '@supabase/ssr';

export const getBrowserClient = () => createBrowserClient(ENV.SUPABASE_URL!, ENV.SUPABASE_ANON_KEY!);
export const browserClient = getBrowserClient();
