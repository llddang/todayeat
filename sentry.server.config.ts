// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { ENV, ENV_ERROR } from '@/constants/env.constant';
import * as Sentry from '@sentry/nextjs';

if (!ENV.SENTRY_DSN) throw new Error(ENV_ERROR.SENTRY_DSN);
Sentry.init({
  dsn: ENV.SENTRY_DSN,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false
});
