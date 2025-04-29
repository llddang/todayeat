import { describe, expect, it } from '@jest/globals';
import { snakeToCamelString, snakeToCamel, camelToSnake, camelToSnakeObject } from '../../utils/camelize.util';
import { snakeCaseFixtures, camelCaseFixtures } from '../fixtures/camelize.fixture';

describe('camelize.util', () => {
  describe('snakeToCamel', () => {
    it('snake_case를 camelCase로 변환해야 합니다', () => {
      expect(snakeToCamelString('hello_world')).toBe('helloWorld');
      expect(snakeToCamelString('first_name_last_name')).toBe('firstNameLastName');
      expect(snakeToCamelString('user_id')).toBe('userId');
    });

    it('이미 camelCase인 문자열은 변경하지 않아야 합니다', () => {
      expect(snakeToCamelString('helloWorld')).toBe('helloWorld');
      expect(snakeToCamelString('firstName')).toBe('firstName');
    });
  });

  describe('snakeToCamelObject', () => {
    it('단순 객체의 키를 snake_case에서 camelCase로 변환해야 합니다', () => {
      const { input, expected } = snakeCaseFixtures.simple;
      expect(snakeToCamel(input)).toEqual(expected);
    });

    it('중첩된 객체의 키를 snake_case에서 camelCase로 변환해야 합니다', () => {
      const { input, expected } = snakeCaseFixtures.nested;
      expect(snakeToCamel(input)).toEqual(expected);
    });

    it('배열 내부의 객체도 변환해야 합니다', () => {
      const { input, expected } = snakeCaseFixtures.array;
      expect(snakeToCamel(input)).toEqual(expected);
    });
  });

  describe('camelToSnake', () => {
    it('camelCase를 snake_case로 변환해야 합니다', () => {
      expect(camelToSnake('helloWorld')).toBe('hello_world');
      expect(camelToSnake('firstNameLastName')).toBe('first_name_last_name');
      expect(camelToSnake('userId')).toBe('user_id');
    });

    it('이미 snake_case인 문자열은 변경하지 않아야 합니다', () => {
      expect(camelToSnake('hello_world')).toBe('hello_world');
      expect(camelToSnake('first_name')).toBe('first_name');
    });
  });

  describe('camelToSnakeObject', () => {
    it('단순 객체의 키를 camelCase에서 snake_case로 변환해야 합니다', () => {
      const { input, expected } = camelCaseFixtures.simple;
      expect(camelToSnakeObject(input)).toEqual(expected);
    });

    it('중첩된 객체의 키를 camelCase에서 snake_case로 변환해야 합니다', () => {
      const { input, expected } = camelCaseFixtures.nested;
      expect(camelToSnakeObject(input)).toEqual(expected);
    });

    it('배열 내부의 객체도 변환해야 합니다', () => {
      const { input, expected } = camelCaseFixtures.array;
      expect(camelToSnakeObject(input)).toEqual(expected);
    });
  });
});
