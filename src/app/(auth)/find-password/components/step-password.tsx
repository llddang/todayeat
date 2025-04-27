'use client';

import { ReactNode, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { changePassword } from '@/apis/auth-server.api';
import formSchema from '@/app/schemas/form-schema.schema';
import { Typography } from '@/components/ui/typography';
import SITE_MAP from '@/constants/site-map.constant';
import PUBLIC_ERROR_MESSAGE from '@/constants/public-error-message.constant';
import Modal from '@/components/commons/modal';

const passwordSchema = z.object({
  password: formSchema.PASSWORD_SCHEMA
});
type PasswordSchemaType = z.infer<typeof passwordSchema>;

const defaultModalInfo = {
  title: '',
  content: ''
};

type StepPasswordProps = {
  nextStep: () => void;
};
const StepPassword = ({ nextStep }: StepPasswordProps) => {
  const [isPending, setIsPending] = useState(false);
  const [modalInfo, setModalInfo] = useState<{ title: string; content: ReactNode }>(defaultModalInfo);

  const params = useSearchParams();
  const error = params.get('error');

  const form = useForm<PasswordSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '' }
  });

  if (!!error) return redirect(`${SITE_MAP.HOME}/?error_code=${PUBLIC_ERROR_MESSAGE.EXPIRED_EMAIL_TOKEN.code}`);

  const password = form.getValues('password');
  const passwordState = form.getFieldState('password');

  const handleSubmit = async ({ password }: PasswordSchemaType) => {
    setIsPending(true);

    const { error: changePasswordError } = await changePassword(password);

    if (changePasswordError) setModalInfo({ title: changePasswordError.message, content: changePasswordError.action });
    else nextStep();
    setIsPending(false);
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-2">
        <Typography as="h3" variant="title3" className="text-gray-900">
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
            {isPending ? '비밀번호 변경 중' : '완료'}
          </Button>
        </form>
      </Form>
      <Modal open={!!modalInfo.title} onOpenChange={() => setModalInfo(defaultModalInfo)} {...modalInfo} />
    </>
  );
};
export default StepPassword;
