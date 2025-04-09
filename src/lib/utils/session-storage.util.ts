import { isServer } from '@/lib/utils/predicate.util';

export const getSessionStorageItem = <R>(id: string, defaultValue: R): R => {
  if (isServer()) return defaultValue as R;

  const sessionData = sessionStorage.getItem(id) ?? '{}';
  let parsedData: R;

  try {
    parsedData = JSON.parse(sessionData);
  } catch (parseError) {
    console.error('Failed to parse session data:', parseError);
    parsedData = {} as R;
    sessionStorage.setItem(id, '{}');
  }

  return parsedData;
};

export const setSessionStorageItem = (id: string, item: unknown): boolean => {
  if (isServer()) return false;

  sessionStorage.setItem(id, JSON.stringify(item));

  return false;
};
