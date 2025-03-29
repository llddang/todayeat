import { createBrowserClient } from '@supabase/ssr';
import ENV from '@/constants/env.constant';

export const getBrowserClient = () => createBrowserClient(ENV.SUPABASE_URL!, ENV.SUPABASE_ANON_KEY!);
export const browserClient = getBrowserClient();
