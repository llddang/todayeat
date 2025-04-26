// Types for browser environment globals
type GlobalWindow = Window & typeof globalThis;
type GlobalDocument = Document;
type GlobalNavigator = Navigator;

// Store original environment state for restoration
let originalWindow: GlobalWindow | undefined;
let originalDocument: GlobalDocument | undefined;
let originalNavigator: GlobalNavigator | undefined;

// Save current environment state before tests
export const saveOriginalEnvironment = () => {
  originalWindow = global.window;
  originalDocument = global.document;
  originalNavigator = global.navigator;
};

// Mock browser environment by setting empty objects
export const mockClientEnvironment = () => {
  (global as { window: GlobalWindow }).window = {} as GlobalWindow;
  (global as { document: GlobalDocument }).document = {} as GlobalDocument;
  (global as { navigator: GlobalNavigator }).navigator = {} as GlobalNavigator;
};

// Mock server environment by removing browser globals
export const mockServerEnvironment = () => {
  delete (global as { window?: GlobalWindow }).window;
  delete (global as { document?: GlobalDocument }).document;
  delete (global as { navigator?: GlobalNavigator }).navigator;
};

// Restore original environment state after tests
export const restoreEnvironment = () => {
  if (originalWindow) (global as { window: GlobalWindow }).window = originalWindow;
  if (originalDocument) (global as { document: GlobalDocument }).document = originalDocument;
  if (originalNavigator) (global as { navigator: GlobalNavigator }).navigator = originalNavigator;
};
