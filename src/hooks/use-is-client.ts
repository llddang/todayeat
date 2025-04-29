'use client';
import { useSyncExternalStore } from 'react';

const clientStore = {
  subscribe: () => () => {},
  getClientSnapshot: () => true,
  getServerSnapshot: () => false
};

const useIsClient = () => {
  const isClient = useSyncExternalStore(
    clientStore.subscribe,
    clientStore.getClientSnapshot,
    clientStore.getServerSnapshot
  );

  return isClient;
};

export default useIsClient;
