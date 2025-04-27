'use client';

import { ReactNode, useState } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { changePassword, signIn } from '@/apis/auth-server.api';
import formSchema from '@/app/schemas/form-schema.schema';
import { Typography } from '@/components/ui/typography';
import SITE_MAP from '@/constants/site-map.constant';
import PUBLIC_ERROR_MESSAGE from '@/constants/public-error-message.constant';
import InformationModal from '@/components/commons/information-modal';
import { StepNewPasswordType } from '../types/funnel-type';
import { useUserStore } from '@/store/user-store';

const passwordSchema = z.object({
  password: formSchema.PASSWORD_SCHEMA
});
type PasswordSchemaType = z.infer<typeof passwordSchema>;

const defaultModalInfo = {
  title: '',
  description: ''
};

type StepNewPasswordProps = {
  data: StepNewPasswordType;
  nextStep: () => void;
};
const StepNewPassword = ({ data, nextStep }: StepNewPasswordProps) => {
  const [isPending, setIsPending] = useState(false);
  const [modalInfo, setModalInfo] = useState<{ title: string; description: ReactNode; onConfirm?: () => void }>(
    defaultModalInfo
  );

  const user = useUserStore((state) => state.user);
  const router = useRouter();

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

    try {
      const { error: checkCurrentPasswordError } = await signIn(user.email, data.currentPassword);
      if (checkCurrentPasswordError) {
        console.log('error');
        return setModalInfo({
          title: '비정상적인 접근입니다.',
          description: '기존 비밀번호와 동일하지 않습니다.',
          onConfirm: () => router.push(SITE_MAP.CHANGE_PASSWORD)
        });
      }

      const { error: changePasswordError } = await changePassword(password);
      if (changePasswordError)
        setModalInfo({ title: changePasswordError.message, description: changePasswordError.action });
      else nextStep();
    } catch (e) {
      console.error(e);
      setModalInfo({
        title: '예상하지 못한 오류가 발생했습니다.',
        description: '잠시 후 다시 시도해주세요.'
      });
    } finally {
      setIsPending(false);
    }
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
                <FormLabel className="sr-only">새로운 비밀번호</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending || !password || passwordState.invalid} className="w-full">
            {isPending ? '비밀번호 변경 중' : '비밀번호 수정'}
          </Button>
        </form>
      </Form>
      <InformationModal open={!!modalInfo.title} onOpenChange={() => setModalInfo(defaultModalInfo)} {...modalInfo} />
    </>
  );
};
export default StepNewPassword;
