'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { signIn } from '@/lib/apis/auth-server.api';
import { UserSignInDTO } from '@/types/DTO/user.dto';
import SITE_MAP from '@/constants/site-map.constant';

import { Typography } from '@/components/ui/typography';
import Link from 'next/link';

const signInDefaultValue: UserSignInDTO = {
  email: '',
  password: ''
};

const AuthSignInForm = () => {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const form = useForm<UserSignInDTO>({
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
    defaultValues: signInDefaultValue
  });

  const isFormInvalid = !form.getValues('email') || !form.getValues('password');

  const handleSubmit = async ({ email, password }: UserSignInDTO) => {
    setIsPending(true);
    const { error } = await signIn(email, password);
    setIsPending(false);
    if (error) return alert(`${error.action} ${error.message}`);
    router.push(SITE_MAP.HOME);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">이메일</FormLabel>
              <FormControl>
                <Input placeholder="이메일 형식의 아이디를 입력해 주세요" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="비밀번호를 입력해 주세요" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-3 pt-2">
          <Button type="submit" disabled={isPending || isFormInvalid}>
            로그인
          </Button>
          <div className="flex justify-center">
            <Link
              href={SITE_MAP.SIGN_UP}
              className="relative after:absolute after:right-0 after:top-1/2 after:h-3 after:w-[1px] after:-translate-y-1/2 after:rounded-full after:bg-gray-400 after:content-['']"
            >
              <Typography className="flex h-11 items-center justify-center px-6 text-gray-600">회원가입</Typography>
            </Link>
            <Link href={SITE_MAP.FIND_PASSWORD}>
              <Typography className="flex h-11 items-center justify-center px-6 text-gray-600">
                비밀번호 찾기
              </Typography>
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default AuthSignInForm;

const signInSchema = z.object({
  email: z.string(),
  password: z.string()
});
