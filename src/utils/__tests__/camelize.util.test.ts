import { describe, expect, it } from '@jest/globals';
import { snakeToCamel, snakeToCamelObject, camelToSnake, camelToSnakeObject } from '../camelize.util';

describe('camelize.util', () => {
  describe('snakeToCamel', () => {
    it('snake_case를 camelCase로 변환해야 합니다', () => {
      expect(snakeToCamel('hello_world')).toBe('helloWorld');
      expect(snakeToCamel('first_name_last_name')).toBe('firstNameLastName');
      expect(snakeToCamel('user_id')).toBe('userId');
    });

    it('이미 camelCase인 문자열은 변경하지 않아야 합니다', () => {
      expect(snakeToCamel('helloWorld')).toBe('helloWorld');
      expect(snakeToCamel('firstName')).toBe('firstName');
    });
  });

  describe('snakeToCamelObject', () => {
    it('단순 객체의 키를 snake_case에서 camelCase로 변환해야 합니다', () => {
      const input = {
        user_id: 123,
        food_image: 'https://example.com/food.jpg',
        ate_at: '2025-04-23T12:00:00Z'
      };

      const expected = {
        userId: 123,
        foodImage: 'https://example.com/food.jpg',
        ateAt: '2025-04-23T12:00:00Z'
      };

      expect(snakeToCamelObject(input)).toEqual(expected);
    });

    it('중첩된 객체의 키를 snake_case에서 camelCase로 변환해야 합니다', () => {
      const input = {
        meal_details: {
          menu_name: '양배추볶음',
          meal_id: '0042',
          meals: {
            user_id: 123,
            food_image: 'https://example.com/food.jpg',
            ate_at: '2025-04-23T12:00:00Z'
          }
        }
      };

      const expected = {
        mealDetails: {
          menuName: '양배추볶음',
          mealId: '0042',
          meals: {
            userId: 123,
            foodImage: 'https://example.com/food.jpg',
            ateAt: '2025-04-23T12:00:00Z'
          }
        }
      };

      expect(snakeToCamelObject(input)).toEqual(expected);
    });

    it('배열 내부의 객체도 변환해야 합니다', () => {
      const input = {
        user_list: [
          { first_name: 'John', last_name: 'Doe' },
          { first_name: 'Jane', last_name: 'Smith' }
        ]
      };

      const expected = {
        userList: [
          { firstName: 'John', lastName: 'Doe' },
          { firstName: 'Jane', lastName: 'Smith' }
        ]
      };

      expect(snakeToCamelObject(input)).toEqual(expected);
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
      const input = {
        firstName: 'John',
        lastName: 'Doe',
        userId: 123
      };

      const expected = {
        first_name: 'John',
        last_name: 'Doe',
        user_id: 123
      };

      expect(camelToSnakeObject(input)).toEqual(expected);
    });

    it('중첩된 객체의 키를 camelCase에서 snake_case로 변환해야 합니다', () => {
      const input = {
        mealDetails: {
          menuName: '양배추볶음',
          mealId: '0042',
          meals: {
            userId: 123,
            foodImage: 'https://example.com/food.jpg',
            ateAt: '2025-04-23T12:00:00Z'
          }
        }
      };

      const expected = {
        meal_details: {
          menu_name: '양배추볶음',
          meal_id: '0042',
          meals: {
            user_id: 123,
            food_image: 'https://example.com/food.jpg',
            ate_at: '2025-04-23T12:00:00Z'
          }
        }
      };

      expect(camelToSnakeObject(input)).toEqual(expected);
    });

    it('배열 내부의 객체도 변환해야 합니다', () => {
      const input = {
        userList: [
          { firstName: 'John', lastName: 'Doe' },
          { firstName: 'Jane', lastName: 'Smith' }
        ]
      };

      const expected = {
        user_list: [
          { first_name: 'John', last_name: 'Doe' },
          { first_name: 'Jane', last_name: 'Smith' }
        ]
      };

      expect(camelToSnakeObject(input)).toEqual(expected);
    });
  });
});
