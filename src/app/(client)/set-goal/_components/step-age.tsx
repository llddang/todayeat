import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import formSchema from '@/schemas/form-schema.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUserStore } from '@/store/user.store';

type StepAgeProps = {
  nextStep: (data: number) => void;
};

const ageFormSchema = z.object({
  age: formSchema.AGE_SCHEMA
});

type FormValues = z.infer<typeof ageFormSchema>;

const StepAge = ({ nextStep }: StepAgeProps) => {
  const { nickname: userName } = useUserStore((state) => state.user);
  const form = useForm<FormValues>({
    resolver: zodResolver(ageFormSchema),
    defaultValues: {
      age: ''
    },
    mode: 'onBlur'
  });

  const onSubmit = (data: FormValues) => {
    nextStep(Number(data.age));
  };

  return (
    <>
      <div>
        <Typography as="h3" variant="title3" className="mb-2">
          {userName}님의 <br /> 나이를 알려주세요
        </Typography>
        <Typography as="span" variant="body2" className="text-gray-600">
          더 정확하고 맞춤화된 피드백을 위해 필요해요
        </Typography>
      </div>
      <div className="space-y-2 pt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full">
            <div className="space-y-[2.3rem]">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">나이</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" inputMode="numeric" className="mb-2" />
                    </FormControl>
                    {!form.getFieldState('age').invalid && <FormDescription>숫자만 입력해 주세요</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="fixed bottom-[calc(env(safe-area-inset-bottom,1.5rem)+1.5rem)] left-1/2 w-[calc(100%-2.5rem)] -translate-x-1/2 xl:relative xl:bottom-auto xl:left-auto xl:mt-6 xl:w-full xl:-translate-x-0"
              disabled={!form.formState.isValid}
            >
              다음
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default StepAge;
