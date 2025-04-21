import { Typography } from '@/components/ui/typography';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import formSchema from '@/app/schemas/form-schema.schema';
import { useForm } from 'react-hook-form';
import { checkEmailExists } from '@/apis/auth-server.api';
import { StepEmailType } from '@/app/(auth)/sign-up/types/funnel-type';

const emailSchema = z.object({
  email: formSchema.EMAIL_SCHEMA
});
type EmailSchemaType = z.infer<typeof emailSchema>;
type StepEmailProps = {
  data: StepEmailType;
  nextStep: (email: string) => void;
};

const StepEmail = ({ data, nextStep }: StepEmailProps) => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const form = useForm<EmailSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(emailSchema),
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

  const onSubmit = async ({ email }: EmailSchemaType) => {
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
                {/* TODO: 디자이너님께 검수받기. */}
                {isCheckingEmail && <FormDescription>이메일 중복 검사하고 있어요</FormDescription>}
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

export default StepEmail;
