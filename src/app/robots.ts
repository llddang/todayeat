import { ENV, ENV_ERROR } from '@/constants/env.constant';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  if (!ENV.PROJECT_URL) throw new Error(ENV_ERROR.PROJECT_URL);
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      }
    ],
    sitemap: `${ENV.PROJECT_URL}/sitemap.xml`
  };
}
