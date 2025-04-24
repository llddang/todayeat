import { cleanupBlobUrl } from '../../utils/cleanup-blob-url.util';

describe('cleanupBlobUrl', () => {
  beforeEach(() => {
    global.URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('blob URL을 클린업해야 합니다', () => {
    const url = 'blob:https://example.com/123';
    cleanupBlobUrl(url);
    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith(url);
  });

  it('blob URL이 아닌 경우 클린업하지 않아야 합니다', () => {
    const url = 'https://example.com/123';
    cleanupBlobUrl(url);
    expect(global.URL.revokeObjectURL).not.toHaveBeenCalled();
  });

  it('null 인 경우 클린업하지 않아야 합니다', () => {
    cleanupBlobUrl(null);
    expect(global.URL.revokeObjectURL).not.toHaveBeenCalled();
  });
});
