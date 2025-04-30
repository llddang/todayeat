'use server';

import SITE_MAP from '@/constants/site-map.constant';
import { revalidatePath } from 'next/cache';

export const revalidate = () => {
  revalidatePath(SITE_MAP.MEAL_POST);
};
