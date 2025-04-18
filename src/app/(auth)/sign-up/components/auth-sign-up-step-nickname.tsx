import { Typography } from '@/components/ui/typography';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import formSchema from '@/app/schemas/form-schema.schema';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { SignUpStep3Type } from '@/types/sign-up-funnel-type';
import { signUp } from '@/lib/apis/auth-server.api';

const signUpNicknameSchema = z.object({
  nickname: formSchema.NICKNAME_SCHEMA
});
type SignUpNicknameSchemaType = z.infer<typeof signUpNicknameSchema>;

type AuthSignUpStepNicknameProps = {
  data: SignUpStep3Type;
  nextStep: () => void;
  clear: () => void;
};

const AuthSignUpStepNickname = ({ data, nextStep, clear }: AuthSignUpStepNicknameProps) => {
  const [isPending, setIsPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<SignUpNicknameSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(signUpNicknameSchema),
    defaultValues: { nickname: data.nickname ?? '' }
  });

  const nickname = form.watch('nickname');
  const nicknameState = form.getFieldState('nickname');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSubmit = async ({ nickname }: SignUpNicknameSchemaType) => {
    setIsPending(true);
    const { error } = await signUp(data.email, data.password, nickname);
    setIsPending(false);
    if (error) return alert(`${error.action} ${error.message}`);
    nextStep();
    clear();
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Typography as="h3" variant="title2" className="text-gray-900">
          닉네임을 입력해 주세요
        </Typography>
        <Typography as="span" variant="body2" className="text-gray-600">
          한글, 영어, 숫자만 사용해 2~8자로 입력해 주세요
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-3">
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">닉네임</FormLabel>
                <FormControl>
                  <Input type="text" {...field} ref={inputRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!nickname || nicknameState.invalid || isPending} className="w-full">
            가입하기
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AuthSignUpStepNickname;
