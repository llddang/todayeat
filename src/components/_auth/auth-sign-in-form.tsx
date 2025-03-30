'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import FormSchema from '@/constants/form-schema.constant';
import { signIn } from '@/libs/apis/auth-server.api';
import { UserSignInDTO } from '@/types/DTO/user.dto';

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

  const handleSubmit = async ({ email, password }: UserSignInDTO) => {
    setIsPending(true);
    signIn(email, password)
      .then(() => router.push('/'))
      .catch((e) => alert(e.message))
      .finally(() => setIsPending(false));
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="example@naver.com" {...field} />
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
        <Button type="submit" disabled={isPending}>
          로그인
        </Button>
      </form>
    </Form>
  );
};
export default AuthSignInForm;

const signInSchema = z.object({
  email: FormSchema.NON_EMPTY_SCHEMA,
  password: FormSchema.NON_EMPTY_SCHEMA
});
