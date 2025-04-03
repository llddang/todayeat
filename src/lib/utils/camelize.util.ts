import { CamelCaseObject, SnakeCaseObject } from '@/types/common.type';

/**
 * snake_case를 camelCase로 변환하는 함수
 * @param {string} str - 변환할 snake_case 문자열
 * @returns {string} - 변환된 camelCase 문자열
 */
export const snakeToCamel = (str: string): string => str.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());

/**
 * 객체의 모든 키를 snake_case에서 camelCase로 재귀적으로 변환
 * @param {any} obj - 변환할 객체
 * @returns {any} - 키가 camelCase로 변환된 객체
 */
export const snakeToCamelObject = <T>(obj: T): CamelCaseObject<T> => {
  if (obj === null || obj === undefined) {
    return obj as unknown as CamelCaseObject<T>;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamelObject(item)) as unknown as CamelCaseObject<T>;
  }

  if (typeof obj !== 'object') {
    return obj as CamelCaseObject<T>;
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = snakeToCamel(key);
    if (typeof value === 'object') result[newKey] = snakeToCamelObject(value);
    else result[newKey] = value;
  }

  return result as CamelCaseObject<T>;
};

/**
 * camelCase를 snake_case로 변환하는 함수
 * @param {string} str - 변환할 camelCase 문자열
 * @returns {string} - 변환된 snake_case 문자열
 */
export const camelToSnake = (str: string): string => str.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);

/**
 * 객체의 모든 키를 camelCase에서 snake_case로 재귀적으로 변환
 * @param {any} obj - 변환할 객체
 * @returns {any} - 키가 snake_case로 변환된 객체
 */
export function camelToSnakeObject<T extends object>(obj: T): SnakeCaseObject<T> {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => camelToSnakeObject(item)) as unknown as SnakeCaseObject<T>;
  }

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = camelToSnake(key);
    if (typeof value === 'object') result[newKey] = snakeToCamelObject(value);
    else result[newKey] = value;
  }

  return result as SnakeCaseObject<T>;
}
