import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import formSchema from '@/schemas/form-schema.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUserStore } from '@/store/user.store';

type StepWeightProps = {
  nextStep: (data: number) => void;
};

const weightFormSchema = z.object({
  weight: formSchema.WEIGHT_SCHEMA
});

type FormValues = z.infer<typeof weightFormSchema>;

const StepWeight = ({ nextStep }: StepWeightProps) => {
  const { nickname: userName } = useUserStore((state) => state.user);
  const form = useForm<FormValues>({
    resolver: zodResolver(weightFormSchema),
    defaultValues: {
      weight: ''
    },
    mode: 'onBlur'
  });

  const onSubmit = (data: FormValues) => {
    nextStep(Number(data.weight));
  };

  return (
    <>
      <div>
        <Typography as="h3" variant="title3" className="mb-2">
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">몸무게</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" inputMode="numeric" measure="kg" className="mb-2" />
                    </FormControl>
                    {!form.getFieldState('weight').invalid && (
                      <FormDescription>최대 소수점 1자리수까지 입력할 수 있어요</FormDescription>
                    )}
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

export default StepWeight;
