import { getSessionStorageItem, removeSessionStorageItem, setSessionStorageItem } from '@/utils/session-storage.util';
import { mockClientEnvironment, saveOriginalEnvironment, restoreEnvironment } from '../fixtures/environment.fixture';
import {
  createMockSessionStorage,
  resetMockSessionStorage,
  TEST_KEY,
  TEST_VALUE,
  NON_EXISTENT_KEY,
  DEFAULT_VALUE
} from '../fixtures/session-storage.fixture';

jest.mock('@/utils/predicate.util', () => ({
  isServer: jest.fn().mockReturnValue(false)
}));

describe('SessionStorageUtil', () => {
  beforeEach(() => {
    saveOriginalEnvironment();
    mockClientEnvironment();
    createMockSessionStorage();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    restoreEnvironment();
    resetMockSessionStorage();
    jest.restoreAllMocks();
  });

  describe('setSessionStorageItem', () => {
    it('세션 스토리지에 아이템을 저장해야 합니다', () => {
      setSessionStorageItem(TEST_KEY, TEST_VALUE);
      expect(sessionStorage.setItem).toHaveBeenCalledWith(TEST_KEY, JSON.stringify(TEST_VALUE));
    });
  });

  describe('getSessionStorageItem', () => {
    it('세션 스토리지에서 아이템을 가져와야 합니다', () => {
      (sessionStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(TEST_VALUE));
      const result = getSessionStorageItem(TEST_KEY, TEST_VALUE);

      expect(result).toBe(TEST_VALUE);
    });

    it('세션 스토리지에서 아이템을 찾지 못하면 빈 객체를 반환해야 합니다', () => {
      (sessionStorage.getItem as jest.Mock).mockReturnValue('invalid json');
      const result = getSessionStorageItem(NON_EXISTENT_KEY, DEFAULT_VALUE);

      expect(result).toEqual({});
      expect(sessionStorage.setItem).toHaveBeenCalledWith(NON_EXISTENT_KEY, JSON.stringify(DEFAULT_VALUE));
    });
  });

  describe('removeSessionStorageItem', () => {
    it('세션 스토리지에서 아이템을 제거해야 합니다', () => {
      setSessionStorageItem(TEST_KEY, TEST_VALUE);
      expect(sessionStorage.setItem).toHaveBeenCalledWith(TEST_KEY, JSON.stringify(TEST_VALUE));

      removeSessionStorageItem(TEST_KEY);
      expect(sessionStorage.removeItem).toHaveBeenCalledWith(TEST_KEY);
    });
  });
});
