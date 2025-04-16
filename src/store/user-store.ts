import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserDTO } from '@/types/DTO/user.dto';
import { getUser } from '@/lib/apis/user.api';
import { signOut } from '@/lib/apis/auth-server.api';

type UserStore = {
  user: UserDTO;
  setAuthenticatedUser: () => Promise<void>;
  signOut: () => Promise<void>;
};

const initialUser: UserDTO = {
  id: '',
  createdAt: '',
  email: '',
  nickname: '',
  profileImage: '',
  personalInfo: {
    id: '',
    userId: '',
    gender: 'WOMAN',
    dailyCaloriesGoal: 0,
    dailyCarbohydrateGoal: 0,
    dailyProteinGoal: 0,
    dailyFatGoal: 0,
    height: 0,
    weight: 0,
    age: 0,
    activityLevel: 'MODERATE',
    purpose: 'WEIGHT_MAINTENANCE'
  }
};

export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      user: initialUser,
      setAuthenticatedUser: async () => {
        try {
          const user = await getUser();
          set({ user });
        } catch (error) {
          console.error('유저 정보 가져오기 실패:', error);
        }
      },
      signOut: async () => {
        try {
          await signOut();
          set({ user: initialUser });
        } catch (error) {
          console.error('로그아웃 실패:', error);
        }
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
);
