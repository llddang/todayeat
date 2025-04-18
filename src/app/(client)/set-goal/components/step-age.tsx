import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import FormSchema from '@/constants/form-schema.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type StepAgeProps = {
  userName: string;
  nextStep: (data: number) => void;
};

const formSchema = z.object({
  age: FormSchema.ONLY_NUMBER_SCHEMA
});

type FormValues = z.infer<typeof formSchema>;

const StepAge = ({ userName, nextStep }: StepAgeProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: ''
    }
  });

  const onSubmit = (data: FormValues) => {
    nextStep(Number(data.age));
  };

  return (
    <>
      <div>
        <Typography as="h3" variant="title2" className="mb-2">
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
                render={({ field }) => {
                  const hasError = !!form.formState.errors.age;
                  return (
                    <FormItem>
                      <FormLabel className="sr-only">나이</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" inputMode="numeric" className="mb-2" />
                      </FormControl>
                      {!hasError && <FormDescription>숫자만 입력해 주세요</FormDescription>}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <Button
              type="submit"
              className="fixed bottom-6 left-1/2 w-[calc(100%-2.5rem)] -translate-x-1/2"
              disabled={!form.watch('age')}
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
