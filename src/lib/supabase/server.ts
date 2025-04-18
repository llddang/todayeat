import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { ENV, ENV_ERROR } from '@/constants/env.constant';

export const getServerClient = () => {
  const cookieStore = cookies();

  if (!ENV.SUPABASE_URL) throw new Error(ENV_ERROR.SUPABASE_URL);
  if (!ENV.SUPABASE_ANON_KEY) throw new Error(ENV_ERROR.SUPABASE_ANON_KEY);

  return createServerClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      }
    }
  });
};
