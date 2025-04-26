export const TEST_KEY = 'testKey';
export const TEST_VALUE = 'testValue';
export const NON_EXISTENT_KEY = 'nonExistentKey';
export const DEFAULT_VALUE = {};

export const createMockSessionStorage = () => {
  const mockSessionStorage = {
    getItem: jest.fn().mockImplementation(() => null),
    setItem: jest.fn().mockImplementation(() => {}),
    removeItem: jest.fn().mockImplementation(() => {}),
    clear: jest.fn().mockImplementation(() => {}),
    length: 0,
    key: jest.fn().mockImplementation(() => null)
  } as unknown as Storage;

  (global as { sessionStorage: Storage }).sessionStorage = mockSessionStorage;

  return mockSessionStorage;
};

export const resetMockSessionStorage = () => {
  jest.clearAllMocks();
};

type Storage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
  length: number;
  key(index: number): string | null;
};
