'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import formSchema from '@/app/schemas/form-schema.schema';
import { checkEmailExists, resetPasswordByEmail } from '@/lib/apis/auth-server.api';

const AuthEmailFormForFindPassword = () => {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<EmailFormType>({
    mode: 'onBlur',
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' }
  });

  const handleSubmit = async ({ email }: EmailFormType) => {
    setIsPending(true);
    const { data } = await checkEmailExists(email);
    if (!data) {
      setIsPending(false);
      return alert('존재하지 않는 유저입니다.');
    }
    const { error } = await resetPasswordByEmail(email);
    setIsPending(false);
    if (error) alert(`${error.action} ${error.message}`);
    else alert('메일 발송 완료');
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
                <Input placeholder="test@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          이메일 발송
        </Button>
      </form>
    </Form>
  );
};
export default AuthEmailFormForFindPassword;

const emailSchema = z.object({ email: formSchema.NON_EMPTY_SCHEMA });
type EmailFormType = z.infer<typeof emailSchema>;
