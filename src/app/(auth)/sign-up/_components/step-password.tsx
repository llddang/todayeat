import { Typography } from '@/components/ui/typography';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import formSchema from '@/schemas/form-schema.schema';
import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';

const passwordSchema = z.object({
  password: formSchema.PASSWORD_SCHEMA
});
type PasswordSchemaType = z.infer<typeof passwordSchema>;
const passwordDefault: PasswordSchemaType = {
  password: ''
};

type StepPasswordProps = {
  nextStep: (password: string) => void;
};

const StepPassword = ({ nextStep }: StepPasswordProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<PasswordSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(passwordSchema),
    defaultValues: passwordDefault
  });

  const password = form.watch('password');
  const passwordState = form.getFieldState('password');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSubmit = async ({ password }: PasswordSchemaType) => {
    nextStep(password);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Typography as="h3" variant="title3" className="text-gray-900">
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

export default StepPassword;
