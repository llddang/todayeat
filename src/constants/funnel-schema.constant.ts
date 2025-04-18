import FormSchema from '@/constants/form-schema.constant';
import { z } from 'zod';

export const SIGN_UP_FUNNEL_SCHEMA = z.object({
  email: FormSchema.EMAIL_SCHEMA,
  password: FormSchema.PASSWORD_SCHEMA,
  nickname: FormSchema.NICKNAME_SCHEMA
});
