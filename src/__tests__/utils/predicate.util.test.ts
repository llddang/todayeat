import { isClient, isServer } from '../../utils/predicate.util';
import {
  mockClientEnvironment,
  mockServerEnvironment,
  restoreEnvironment,
  saveOriginalEnvironment
} from '../fixtures/environment.fixture';

describe('predicate.util', () => {
  beforeEach(() => {
    saveOriginalEnvironment();
    mockServerEnvironment();
  });

  afterEach(() => {
    restoreEnvironment();
  });

  describe('isClient', () => {
    it('클라이언트 환경에서 true를 반환해야 합니다', () => {
      mockClientEnvironment();
      expect(isClient()).toBe(true);
    });

    it('서버 환경에서 false를 반환해야 합니다', () => {
      expect(isClient()).toBe(false);
    });
  });

  describe('isServer', () => {
    it('서버 환경에서 true를 반환해야 합니다', () => {
      expect(isServer()).toBe(true);
    });

    it('클라이언트 환경에서 false를 반환해야 합니다', () => {
      mockClientEnvironment();
      expect(isServer()).toBe(false);
    });
  });
});
