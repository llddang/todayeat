'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserSignUpDTO } from '@/types/DTO/user.dto';
import FormSchema from '@/constants/form-schema.constant';
import { checkEmailExists, signUp } from '@/libs/apis/auth-server.api';
import { useRouter } from 'next/navigation';

type SignUpForm = UserSignUpDTO & { confirmPassword: string };
const signUpDefaultValue = {
  email: '',
  password: '',
  confirmPassword: '',
  name: ''
};

const AuthSignUpForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const router = useRouter();

  const form = useForm<SignUpForm>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValue
  });

  const emailValue = form.watch('email');
  const emailFieldState = form.getFieldState('email');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('email', e.target.value);
    if (emailVerified) setEmailVerified(false);
  };

  const handleVerifyEmail = async () => {
    const email = form.getValues('email');
    if (!email || emailFieldState.invalid) return form.trigger('email');

    setIsCheckingEmail(true);
    checkEmailExists(email)
      .then((isExist) => {
        if (isExist)
          form.setError('email', {
            type: 'manual',
            message: '이미 존재하는 이메일입니다.'
          });
        setEmailVerified(!isExist);
      })
      .catch((e) => alert(e.message))
      .finally(() => setIsCheckingEmail(false));
  };

  const handleSubmit = async ({ email, name, password }: SignUpForm) => {
    setIsPending(true);
    signUp(email, password, name)
      .then(() => router.push('/'))
      .catch((e) => alert(e.message))
      .finally(() => setIsPending(false));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel>이메일</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Input
                placeholder="example@naver.com"
                value={emailValue}
                onChange={handleEmailChange}
                onBlur={() => form.trigger('email')}
                disabled={emailVerified && isCheckingEmail}
              />
              <Button
                type="button"
                onClick={handleVerifyEmail}
                disabled={isCheckingEmail || emailVerified}
                className="mb-[2px]"
                variant={emailVerified ? 'outline' : 'default'}
              >
                {isCheckingEmail ? '확인 중...' : emailVerified ? '확인됨' : '이메일 확인'}
              </Button>
            </div>
          </FormControl>
          {emailFieldState.error && <FormMessage>{emailFieldState.error.message}</FormMessage>}
        </FormItem>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="홍길동" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="***" {...field} />
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
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input type="password" placeholder="***" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!emailVerified || isPending}>
          {emailVerified ? '가입하기' : '이메일 검증 필요'}
        </Button>
      </form>
    </Form>
  );
};
export default AuthSignUpForm;

const signUpSchema = z
  .object({
    email: FormSchema.EMAIL_SCHEMA,
    password: FormSchema.PASSWORD_SCHEMA,
    confirmPassword: FormSchema.CONFIRM_PASSWORD_SCHEMA,
    name: FormSchema.NAME_SCHEMA
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword']
  });
