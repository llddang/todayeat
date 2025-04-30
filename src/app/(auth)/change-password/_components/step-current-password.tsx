'use client';

import { useState, FocusEvent } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import formSchema from '@/schemas/form-schema.schema';
import { Typography } from '@/components/ui/typography';
import SITE_MAP from '@/constants/site-map.constant';
import PUBLIC_ERROR_MESSAGE from '@/constants/public-error-message.constant';
import { signIn } from '@/apis/auth-server.api';
import { useUserStore } from '@/store/user.store';

const passwordSchema = z.object({
  password: formSchema.PASSWORD_SCHEMA
});
type PasswordSchemaType = z.infer<typeof passwordSchema>;

type StepCurrentPasswordProps = {
  nextStep: (password: string) => void;
};
const StepCurrentPassword = ({ nextStep }: StepCurrentPasswordProps) => {
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);

  const user = useUserStore((state) => state.user);

  const params = useSearchParams();
  const error = params.get('error');

  const form = useForm<PasswordSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '' }
  });

  if (!!error) return redirect(`${SITE_MAP.HOME}/?error_code=${PUBLIC_ERROR_MESSAGE.EXPIRED_EMAIL_TOKEN.code}`);

  const handleInputBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const password = e.target.value;
    if (!password || passwordVerified) return;

    setIsCheckingPassword(true);
    const { error } = await signIn(user.email, password);
    setIsCheckingPassword(false);

    if (error)
      return form.setError('password', {
        type: 'manual',
        message: '기존 비밀번호와 일치하지 않습니다.'
      });

    setPasswordVerified(true);
  };

  const handleSubmit = async ({ password }: PasswordSchemaType) => {
    nextStep(password);
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-2">
        <Typography as="h3" variant="title3" className="text-gray-900">
          현재 비밀번호를 입력해 주세요
        </Typography>
        <Typography as="span" variant="body2" className="text-gray-600">
          안전한 비밀번호 수정을 위해 필요해요
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">기존 비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    onBlur={(e) => {
                      field.onBlur();
                      handleInputBlur(e);
                    }}
                    onChange={(e) => {
                      field.onChange(e);
                      setPasswordVerified(false);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!passwordVerified} className="w-full">
            {isCheckingPassword ? '비밀번호 검증 중' : '다음'}
          </Button>
        </form>
      </Form>
    </>
  );
};
export default StepCurrentPassword;
