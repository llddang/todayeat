import { ENV, ENV_ERROR } from '@/constants/env.constant';
import { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => {
  if (!ENV.PROJECT_URL) throw new Error(ENV_ERROR.PROJECT_URL);
  const baseUrl = ENV.PROJECT_URL;
  const currentDate = new Date();

  const routes = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/meal/post`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/report`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/my-page`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/set-goal`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/sign-in`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }
  ];

  return routes;
};

export default sitemap;
