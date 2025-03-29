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

export type SupabaseAuthDTO = {
  user: User | null;
  session: Session | null;
};

export type UserAuthDTO = {
  id: string;
  email: string;
  isAuthenticated: boolean;
};
