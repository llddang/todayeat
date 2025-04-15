'use client';
import HomeMacroNutrientGroup from '@/components/_home/home-macronutrient-group';
import MealPostEditCard from '@/components/_meal/_post/meal-post-edit-card';
import { getMyMealById } from '@/lib/apis/meal.api';
import { MealDTO } from '@/types/DTO/meal.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const mealCardSchema = z.object({
  menuName: z.string(),
  weight: z.coerce.number(),
  calories: z.coerce.number()
});

const formSchema = z.object({
  meals: z.array(mealCardSchema)
});

type FormData = z.infer<typeof formSchema>;

const MealPostEditPage = () => {
  const [meals, setMeals] = useState<Pick<MealDTO, 'mealDetails'>>();

  const method = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meals: []
    }
  });

  useEffect(() => {
    const fetch = async () => {
      const data = await getMyMealById('bad62864-4c6d-4ec7-a6cb-8d0a59e1f1c6');
      setMeals(data);
      method.setValue(
        'meals',
        data.mealDetails.map((meal) => ({
          menuName: meal.menuName,
          weight: meal.weight,
          calories: meal.calories
        }))
      );
      return data;
    };
    fetch().then(console.log);
  }, []);

  const handleOnsubmit = () => {
    const a = method.getValues();
    console.log(a);
  };

  const userData = {
    total: { carbohydrate: 80, protein: 100, fat: 10 },
    goal: { carbohydrate: 200, protein: 200, fat: 200 }
  };
  return (
    <div className="flex flex-col items-center px-4">
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handleOnsubmit)} className="flex w-full flex-col items-center gap-4">
          <div className="flex min-w-[345px] max-w-[460px] flex-col items-center gap-4">
            {meals?.mealDetails.map((meal, idx) => <MealPostEditCard key={idx} idx={idx} mealDetail={meal} />)}
          </div>
          <button type="submit">제출</button>
        </form>
      </FormProvider>
      <HomeMacroNutrientGroup {...userData} />
    </div>
  );
};

export default MealPostEditPage;
