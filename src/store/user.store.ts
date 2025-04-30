import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserDTO } from '@/types/DTO/user.dto';
import { browserClient } from '@/lib/supabase/client';
import { getUser } from '@/apis/user.api';

type UserStore = {
  user: UserDTO;
  setUser: (user: UserDTO) => void;
  resetUser: () => void;
};

const initialUser: UserDTO = {
  id: '',
  createdAt: '',
  email: '',
  nickname: '',
  profileImage: '',
  personalInfo: null
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: initialUser,
      setUser: (user: UserDTO) => set({ user }),
      resetUser: () => set({ user: initialUser })
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
);

export const initializeAuthListener = () => {
  browserClient.auth.onAuthStateChange(async (_, session) => {
    if (session) {
      try {
        const user = await getUser();
        if (user) {
          useUserStore.getState().setUser(user);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    } else {
      useUserStore.getState().resetUser();
    }
  });
};
