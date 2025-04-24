export const snakeCaseFixtures = {
  simple: {
    input: {
      user_id: 123,
      food_image: 'https://example.com/food.jpg',
      ate_at: '2025-04-23T12:00:00Z'
    },
    expected: {
      userId: 123,
      foodImage: 'https://example.com/food.jpg',
      ateAt: '2025-04-23T12:00:00Z'
    }
  },
  nested: {
    input: {
      meal_details: {
        menu_name: '양배추볶음',
        meal_id: '0042',
        meals: {
          user_id: 123,
          food_image: 'https://example.com/food.jpg',
          ate_at: '2025-04-23T12:00:00Z'
        }
      }
    },
    expected: {
      mealDetails: {
        menuName: '양배추볶음',
        mealId: '0042',
        meals: {
          userId: 123,
          foodImage: 'https://example.com/food.jpg',
          ateAt: '2025-04-23T12:00:00Z'
        }
      }
    }
  },
  array: {
    input: {
      user_list: [
        { first_name: 'John', last_name: 'Doe' },
        { first_name: 'Jane', last_name: 'Smith' }
      ]
    },
    expected: {
      userList: [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' }
      ]
    }
  }
};

export const camelCaseFixtures = {
  simple: {
    input: {
      firstName: 'John',
      lastName: 'Doe',
      userId: 123
    },
    expected: {
      first_name: 'John',
      last_name: 'Doe',
      user_id: 123
    }
  },
  nested: {
    input: {
      mealDetails: {
        menuName: '양배추볶음',
        mealId: '0042',
        meals: {
          userId: 123,
          foodImage: 'https://example.com/food.jpg',
          ateAt: '2025-04-23T12:00:00Z'
        }
      }
    },
    expected: {
      meal_details: {
        menu_name: '양배추볶음',
        meal_id: '0042',
        meals: {
          user_id: 123,
          food_image: 'https://example.com/food.jpg',
          ate_at: '2025-04-23T12:00:00Z'
        }
      }
    }
  },
  array: {
    input: {
      userList: [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' }
      ]
    },
    expected: {
      user_list: [
        { first_name: 'John', last_name: 'Doe' },
        { first_name: 'Jane', last_name: 'Smith' }
      ]
    }
  }
};
