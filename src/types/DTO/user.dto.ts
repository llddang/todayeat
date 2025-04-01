import { Session, User } from '@supabase/supabase-js';
import { SnakeCaseObject } from '@/types/common.type';

export type UserDTO = {
  id: string;
  email: string;
  nickname: string;
  profileImage: string | null;
  createdAt: string;
};

export type UserSnakeCaseDTO = SnakeCaseObject<UserDTO>;

export type UserSignUpDTO = Pick<UserDTO, 'email' | 'nickname'> & {
  password: string;
};

export type UserSignInDTO = Pick<UserDTO, 'email'> & {
  password: string;
};

export type SupabaseAuthDTO = {
  user: User | null;
  session: Session | null;
};

export type UserAuthDTO = {
  id: string;
  email: string;
  isAuthenticated: boolean;
};
