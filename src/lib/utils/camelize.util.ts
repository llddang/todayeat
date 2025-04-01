import { CamelCaseObject } from '@/types/common.type';

export const toCamelCase = (str: string): string => str.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());
export const camelize = <T>(obj: T): CamelCaseObject<T> => {
  if (obj === null || obj === undefined) {
    return obj as unknown as CamelCaseObject<T>;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => camelize(item)) as unknown as CamelCaseObject<T>;
  }

  if (typeof obj !== 'object') {
    return obj as CamelCaseObject<T>;
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = toCamelCase(key);
    if (typeof value === 'object') result[newKey] = camelize(value);
    else result[newKey] = value;
  }

  return result as CamelCaseObject<T>;
};
