import { useEffect } from 'react';
import { userStore } from '@/store/user-store';

export const useUserStore = () => {
  const store = userStore();

  useEffect(() => {
    if (!store.user.id) {
      store.setAuthenticatedUser();
    }
  }, []);

  return {
    user: store.user,
    refresh: store.setAuthenticatedUser
  };
};
