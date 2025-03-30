import { Session, User } from '@supabase/supabase-js';

export type UserDTO = {
  id: string;
  email: string;
  name: string;
  profileImage: string;
  createdAt: string;
};

export type UserSnakeCaseDTO = {
  id: string;
  email: string;
  name: string;
  profile_image: string;
  created_at: string;
};

export type UserSignUpDTO = Pick<UserDTO, 'email' | 'name'> & {
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
