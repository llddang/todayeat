import { Session, User } from '@supabase/supabase-js';
import { SnakeCaseObject } from '@/types/common.type';
import { ActivityLevelType, GenderType, PurposeType } from '@/types/user-personal-info.type';

export type UserDTO = {
  id: string;
  createdAt: string;
  email: string;
  nickname: string;
  profileImage: string | null;
  gender: GenderType | null;
  dailyCaloriesGoal: number | null;
  dailyCarbohydrateGoal: number | null;
  dailyProteinGoal: number | null;
  dailyFatGoal: number | null;
  height: number | null;
  weight: number | null;
  age: number | null;
  activityLevel: ActivityLevelType;
  purpose: PurposeType | null;
};

export type UserPhysicalProfileDTO = {
  [K in Extract<keyof UserDTO, 'gender' | 'height' | 'weight' | 'age' | 'activityLevel' | 'purpose'>]: NonNullable<
    UserDTO[K]
  >;
};

export type UserSnakeCaseDTO = SnakeCaseObject<UserDTO>;

export type UserSignUpDTO = Pick<UserDTO, 'email' | 'nickname'> & {
  password: string;
};

export type UserSignInDTO = Pick<UserDTO, 'email'> & {
  password: string;
};

export type UpdateUserDTO = Omit<UserDTO, 'id' | 'createdAt' | 'email'>;

export type SupabaseAuthDTO = {
  user: User | null;
  session: Session | null;
};

export type UserAuthDTO = {
  id: string;
  email: string;
  isAuthenticated: boolean;
};
