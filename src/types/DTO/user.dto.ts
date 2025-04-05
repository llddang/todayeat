import { Session, User } from '@supabase/supabase-js';
import { SnakeCaseObject } from '@/types/common.type';
import { GenderKey } from '@/types/gender.type';

export type UserDTO = {
  id: string;
  createdAt: string;
  email: string;
  nickname: string;
  profileImage: string | null;
  gender: GenderKey | null;
  dailyCaloriesGoal: number | null;
  height: number | null;
  weight: number | null;
  age: number | null;
  activityLevel: string;
  purpose: string | null;
};

export type userPhysicalProfileKey = 'gender' | 'height' | 'weight' | 'age' | 'activityLevel' | 'purpose';

export type UserPhysicalProfileDTO = Pick<UserDTO, userPhysicalProfileKey>;

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
