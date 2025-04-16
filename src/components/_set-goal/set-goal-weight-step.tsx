import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import FormSchema from '@/constants/form-schema.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type SetGoalWeightStepProps = {
  userName: string;
  nextStep: (data: number) => void;
};

const formSchema = z.object({
  weight: FormSchema.NUMBER_WITH_ONE_DECIMAL_SCHEMA
});

type FormValues = z.infer<typeof formSchema>;

const SetGoalWeightStep = ({ userName, nextStep }: SetGoalWeightStepProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: ''
    }
  });

  const onSubmit = (data: FormValues) => {
    nextStep(Number(data.weight));
  };

  return (
    <>
      <div>
        <Typography as="h3" variant="title2" className="mb-2">
          {userName}님의 <br /> 몸무게를 알려주세요
        </Typography>
        <Typography as="span" variant="body2" className="text-gray-600">
          몸무게를 기준으로 맞춤 칼로리를 계산해요
        </Typography>
      </div>
      <div className="space-y-2 pt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full">
            <div className="space-y-[2.3rem]">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => {
                  const hasError = !!form.formState.errors.weight;

                  return (
                    <FormItem>
                      <FormLabel className="sr-only">몸무게</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" inputMode="numeric" measure="kg" className="mb-2" />
                      </FormControl>
                      {!hasError && <FormDescription>최대 소수점 1자리수까지 입력할 수 있어요</FormDescription>}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <Button
              type="submit"
              className="fixed bottom-6 left-1/2 w-[calc(100%-2.5rem)] -translate-x-1/2"
              disabled={!form.watch('weight')}
            >
              다음
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SetGoalWeightStep;
