'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormSchema from '@/constants/form-schema.constant';
import { browserClient } from '@/lib/utils/supabase/client.util';
import { changePassword, signIn } from '@/lib/apis/auth-server.api';

const passwordChangeDefaultValue: PasswordChangeForm = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};

const AuthChangePasswordForm = () => {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<PasswordChangeForm>({
    mode: 'onBlur',
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: passwordChangeDefaultValue
  });

  const onSubmit = async ({ currentPassword, newPassword }: PasswordChangeForm) => {
    setIsPending(true);
    const {
      data: { user }
    } = await browserClient.auth.getUser();

    try {
      await signIn(user?.email || '', currentPassword);
      await changePassword(newPassword).catch((e) => alert(e.message));
    } catch {
      form.setError('currentPassword', {
        type: 'manual',
        message: '현재 비밀번호 값과 동일하지 않습니다.'
      });
      return;
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>현재 비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="현재 비밀번호 입력" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
export default AuthChangePasswordForm;

const passwordChangeSchema = z
  .object({
    currentPassword: FormSchema.PASSWORD_SCHEMA,
    newPassword: FormSchema.PASSWORD_SCHEMA,
    confirmPassword: FormSchema.PASSWORD_SCHEMA
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '새 비밀번호와 확인 비밀번호가 일치하지 않습니다',
    path: ['confirmPassword']
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: '새 비밀번호는 현재 비밀번호와 달라야 합니다',
    path: ['newPassword']
  });
type PasswordChangeForm = z.infer<typeof passwordChangeSchema>;
