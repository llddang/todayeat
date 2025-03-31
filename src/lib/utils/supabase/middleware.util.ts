import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import ENV from '@/constants/env.constant';
import ENV_ERROR from '@/constants/env-error.constant';

export const createClient = (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  if (!ENV.SUPABASE_URL) throw new Error(ENV_ERROR.SUPABASE_URL);
  if (!ENV.SUPABASE_ANON_KEY) throw new Error(ENV_ERROR.SUPABASE_ANON_KEY);

  createServerClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request
        });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      }
    }
  });

  return supabaseResponse;
};
