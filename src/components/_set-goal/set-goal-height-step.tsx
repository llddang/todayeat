import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import FormSchema from '@/constants/form-schema.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type SetGoalHeightStepProps = {
  userName: string;
  nextStep: (data: number) => void;
};

const formSchema = z.object({
  height: FormSchema.NUMBER_WITH_ONE_DECIMAL_SCHEMA
});

type FormValues = z.infer<typeof formSchema>;

const SetGoalHeightStep = ({ userName, nextStep }: SetGoalHeightStepProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: ''
    }
  });

  const onSubmit = (data: FormValues) => {
    nextStep(Number(data.height));
  };

  return (
    <>
      <div>
        <Typography as="h3" variant="title2" className="mb-2">
          {userName}님의 <br /> 키를 알려주세요
        </Typography>
        <Typography as="span" variant="body2" className="text-gray-600">
          기초대사량과 권장섭취량 계산에 필요해요
        </Typography>
      </div>
      <div className="space-y-2 pt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full">
            <div className="space-y-[2.3rem]">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => {
                  const hasError = !!form.formState.errors.height;

                  return (
                    <FormItem>
                      <FormLabel className="sr-only">키</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          inputMode="numeric"
                          measure="cm"
                          step="0.1"
                          min="50"
                          max="250"
                          className="mb-2"
                        />
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
              disabled={!form.watch('height')}
            >
              다음
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SetGoalHeightStep;
