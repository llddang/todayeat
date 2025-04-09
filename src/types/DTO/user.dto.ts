import { Session, User } from '@supabase/supabase-js';
import { SnakeCaseObject } from '@/types/common.type';
import { GenderType, ActivityLevelType, PurposeType } from '@/types/user-personal-info.type';

export type UserPersonalInfoDTO = {
  id: string;
  createdAt: string;
  userId: string;
  gender: GenderType;
  dailyCaloriesGoal: number;
  dailyCarbohydrateGoal: number;
  dailyProteinGoal: number;
  dailyFatGoal: number;
  height: number;
  weight: number;
  age: number;
  activityLevel: ActivityLevelType;
  purpose: PurposeType;
};

export type UserDTO = {
  id: string;
  createdAt: string;
  email: string;
  nickname: string;
  profileImage: string | null;
  userPersonalInfos: UserPersonalInfoDTO | null;
};

export type UserPhysicalProfileDTO = Pick<
  UserPersonalInfoDTO,
  'gender' | 'height' | 'weight' | 'age' | 'activityLevel' | 'purpose'
>;

export type UserSignUpDTO = Pick<UserDTO, 'email' | 'nickname'> & { password: string };

export type UserSignInDTO = Pick<UserDTO, 'email'> & { password: string };

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

export type UserSnakeCaseDTO = SnakeCaseObject<UserDTO>;
export type UserPersonalInfoSnakeCaseDTO = SnakeCaseObject<UserPersonalInfoDTO>;
