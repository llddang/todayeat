import { Typography } from '@/components/ui/typography';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormSchema from '@/constants/form-schema.constant';
import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';

const signUpPasswordSchema = z.object({
  password: FormSchema.PASSWORD_SCHEMA
});
type SignUpPasswordSchemaType = z.infer<typeof signUpPasswordSchema>;
const signUpPasswordDefault: SignUpPasswordSchemaType = {
  password: ''
};

type AuthSignUpStepPasswordProps = {
  nextStep: (password: string) => void;
};

const AuthSignUpStepPassword = ({ nextStep }: AuthSignUpStepPasswordProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<SignUpPasswordSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(signUpPasswordSchema),
    defaultValues: signUpPasswordDefault
  });

  const password = form.watch('password');
  const passwordState = form.getFieldState('password');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSubmit = async ({ password }: SignUpPasswordSchemaType) => {
    nextStep(password);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Typography as="h3" variant="title2" className="text-gray-900">
          비밀번호를 입력해 주세요
        </Typography>
        <Typography as="span" variant="body2" className="text-gray-600">
          영문, 숫자, 특수문자를 모두 포함해서 입력해 주세요
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">비밀번호</FormLabel>
                <FormControl>
                  <Input type="password" {...field} ref={inputRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!password || passwordState.invalid} className="w-full">
            다음
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AuthSignUpStepPassword;
