import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import formSchema from '@/schemas/form-schema.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUserStore } from '@/store/user.store';

type StepHeightProps = {
  nextStep: (data: number) => void;
};

const heightFormSchema = z.object({
  height: formSchema.HEIGHT_SCHEMA
});

type FormValues = z.infer<typeof heightFormSchema>;

const StepHeight = ({ nextStep }: StepHeightProps) => {
  const { nickname: userName } = useUserStore((state) => state.user);
  const form = useForm<FormValues>({
    resolver: zodResolver(heightFormSchema),
    defaultValues: {
      height: ''
    },
    mode: 'onBlur'
  });

  const onSubmit = (data: FormValues) => {
    nextStep(Number(data.height));
  };

  return (
    <>
      <div>
        <Typography as="h3" variant="title3" className="mb-2">
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
                        <Input {...field} type="number" inputMode="numeric" measure="cm" step="0.1" className="mb-2" />
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

export default StepHeight;
