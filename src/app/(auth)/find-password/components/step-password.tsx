'use client';

import { useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { browserClient } from '@/lib/supabase/client';
import { changePassword, signOut } from '@/apis/auth-server.api';
import formSchema from '@/app/schemas/form-schema.schema';
import { Typography } from '@/components/ui/typography';
import SITE_MAP from '@/constants/site-map.constant';
import PUBLIC_ERROR_MESSAGE from '@/constants/public-error-message.constant';

const passwordSchema = z.object({
  password: formSchema.PASSWORD_SCHEMA
});
type PasswordSchemaType = z.infer<typeof passwordSchema>;

type StepPasswordProps = {
  nextStep: () => void;
};
const StepPassword = ({ nextStep }: StepPasswordProps) => {
  const [isPending, setIsPending] = useState(false);
  const accessToken = useSearchParams().get('code');
  if (!accessToken) return redirect(`${SITE_MAP.HOME}?error_code=${PUBLIC_ERROR_MESSAGE.EXPIRED_EMAIL_TOKEN.code}`);

  const form = useForm<PasswordSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '' }
  });

  const password = form.getValues('password');
  const passwordState = form.getFieldState('password');

  const handleSubmit = async ({ password }: PasswordSchemaType) => {
    setIsPending(true);

    await browserClient.auth.exchangeCodeForSession(accessToken);
    const { error: changePasswordError } = await changePassword(password);
    await signOut();
    setIsPending(false);
    if (changePasswordError) return alert(`${changePasswordError.action} ${changePasswordError.message}`);
    nextStep();
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-2">
        <Typography as="h3" variant="title2" className="text-gray-900">
          새로 사용할 비밀번호를 입력해 주세요
        </Typography>
        <Typography as="span" variant="body2" className="text-gray-600">
          영문, 숫자, 특수문자를 모두 포함해서 입력해 주세요
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">비밀번호</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending || !password || passwordState.invalid} className="w-full">
            완료
          </Button>
        </form>
      </Form>
    </>
  );
};
export default StepPassword;
