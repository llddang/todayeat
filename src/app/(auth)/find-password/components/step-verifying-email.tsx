'use client';

import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import formSchema from '@/app/schemas/form-schema.schema';
import { checkEmailExists, resetPasswordByEmail } from '@/apis/auth-server.api';
import { Typography } from '@/components/ui/typography';
import Modal from '@/components/commons/modal';

const emailSchema = z.object({ email: formSchema.EMAIL_SCHEMA });
type EmailFormType = z.infer<typeof emailSchema>;

const StepVerifyingEmail = () => {
  const [isPending, setIsPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<{ title: string; content: ReactNode }>({ title: '', content: '' });

  const form = useForm<EmailFormType>({
    mode: 'onBlur',
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' }
  });

  const emailState = form.getFieldState('email');
  const email = form.getValues('email');

  const handleSubmit = async () => {
    setIsPending(true);
    const { data } = await checkEmailExists(email);
    if (!data) {
      form.setError('email', {
        type: 'manual',
        message: '존재하지 않는 유저입니다.'
      });
    } else {
      const { error } = await resetPasswordByEmail(email);
      if (error)
        setModalInfo({
          title: error.action,
          content: error.message
        });
      else
        setModalInfo({
          title: '이메일을 보냈어요!',
          content: (
            <Typography variant="body2" className="text-gray-700">
              입력하신 이메일로 비밀번호 재설정 메일을 보냈어요.
              <br />
              메일을 확인하고 비밀번호를 변경하세요.
            </Typography>
          )
        });
      setIsModalOpen(true);
    }
    setIsPending(false);
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-2">
        <Typography as="h3" variant="title3" className="text-gray-900">
          가입하신 아이디를 입력해 주세요
        </Typography>
        <Typography as="span" variant="body2" className="text-gray-600">
          이메일 형식으로 입력해 주세요
        </Typography>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">이메일</FormLabel>
                <FormControl>
                  <Input placeholder="todayeat@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending || !email || emailState.invalid} className="w-full">
            비밀번호 재설정 이메일 보내기
          </Button>
        </form>
      </Form>
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} {...modalInfo} />
    </>
  );
};
export default StepVerifyingEmail;
