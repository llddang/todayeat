import { cleanupBlobUrl } from '../cleanup-blob-url.util';

describe('cleanupBlobUrl', () => {
  it('blob URL을 클린업해야 합니다', () => {
    const url = 'blob:https://example.com/123';
    cleanupBlobUrl(url);
  });

  it('blob URL이 아닌 경우 클린업하지 않아야 합니다', () => {
    const url = 'https://example.com/123';
    cleanupBlobUrl(url);
  });
});
