import { Typography } from '@/components/ui/typography';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import formSchema from '@/app/schemas/form-schema.schema';
import { useForm } from 'react-hook-form';
import { checkEmailExists } from '@/lib/apis/auth-server.api';
import { SignUpStep1Type } from '@/types/sign-up-funnel-type';

const signUpEmailSchema = z.object({
  email: formSchema.EMAIL_SCHEMA
});
type SignUpEmailSchemaType = z.infer<typeof signUpEmailSchema>;
type AuthSignUpStepEmailProps = {
  data: SignUpStep1Type;
  nextStep: (email: string) => void;
};

const AuthSignUpStepEmail = ({ data, nextStep }: AuthSignUpStepEmailProps) => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const form = useForm<SignUpEmailSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(signUpEmailSchema),
    defaultValues: { email: data.email ?? '' }
  });

  const emailState = form.getFieldState('email');

  const verifyEmail = async () => {
    const email = form.getValues('email');
    if (!email || emailVerified) return;

    setIsCheckingEmail(true);
    setEmailVerified(false);

    const { data, error } = await checkEmailExists(email);
    setIsCheckingEmail(false);

    if (error) return alert(`${error.action} ${error.message}`);
    if (data) {
      form.setError('email', {
        type: 'manual',
        message: '이미 존재하는 이메일입니다.'
      });
      return;
    }

    setEmailVerified(true);
  };

  const onSubmit = async ({ email }: SignUpEmailSchemaType) => {
    nextStep(email);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Typography as="h3" variant="title2" className="text-gray-900">
          아이디를 입력해 주세요
        </Typography>
        <Typography as="span" variant="body2" className="text-gray-600">
          이메일 형식으로 입력해 주세요
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">이메일</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="todayeat@email.com"
                    {...field}
                    onBlur={() => {
                      field.onBlur();
                      verifyEmail();
                    }}
                    onChange={(e) => {
                      field.onChange(e);
                      if (emailVerified) setEmailVerified(false);
                    }}
                    disabled={isCheckingEmail}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!emailVerified || emailState.invalid} className="w-full">
            다음
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AuthSignUpStepEmail;
