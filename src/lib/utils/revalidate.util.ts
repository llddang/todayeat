'use server';

import SITE_MAP from '@/constants/site-map.constant';
import { revalidatePath } from 'next/cache';

export const revalidateFunction = async () => {
  revalidatePath(SITE_MAP.HOME);
};
