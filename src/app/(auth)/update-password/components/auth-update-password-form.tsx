'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { browserClient } from '@/lib/utils/supabase/client.util';
import { changePassword } from '@/lib/apis/auth-server.api';
import formSchema from '@/app/schemas/form-schema.schema';
import SITE_MAP from '@/constants/site-map.constant';

const updatePasswordDefaultValue: UpdatePasswordForm = {
  newPassword: '',
  confirmPassword: ''
};

type AuthUpdatePasswordFormProps = {
  accessToken: string;
};
const AuthUpdatePasswordForm = ({ accessToken }: AuthUpdatePasswordFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<UpdatePasswordForm>({
    mode: 'onBlur',
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: updatePasswordDefaultValue
  });

  const onSubmit = async ({ newPassword }: UpdatePasswordForm) => {
    setIsPending(true);

    await browserClient.auth.exchangeCodeForSession(accessToken);
    const { error: changePasswordError } = await changePassword(newPassword);
    setIsPending(false);
    if (changePasswordError) return alert(`${changePasswordError.action} ${changePasswordError.message}`);
    return router.push(SITE_MAP.SIGN_IN);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>새 비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="새 비밀번호 입력" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>새 비밀번호 확인</FormLabel>
              <FormControl>
                <Input type="password" placeholder="새 비밀번호 재입력" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? '변경 중...' : '비밀번호 변경'}
        </Button>
      </form>
    </Form>
  );
};
export default AuthUpdatePasswordForm;

const updatePasswordSchema = z
  .object({
    newPassword: formSchema.PASSWORD_SCHEMA,
    confirmPassword: formSchema.PASSWORD_SCHEMA
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '새 비밀번호와 확인 비밀번호가 일치하지 않습니다',
    path: ['confirmPassword']
  });
type UpdatePasswordForm = z.infer<typeof updatePasswordSchema>;
