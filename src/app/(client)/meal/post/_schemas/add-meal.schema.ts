import { z } from 'zod';

const menuNameRegex = /^[가-힣a-zA-Z0-9\s]+$/;

export const formSchema = z.object({
  menuName: z
    .string()
    .trim()
    .min(1, '메뉴명을 입력해주세요')
    .max(16, '메뉴명은 16자 이내로 입력해주세요')
    .regex(menuNameRegex, { message: '특수문자가 포함될 수 없습니다.' }),
  weight: z.coerce.number().optional()
});

export type FoodFormValues = z.infer<typeof formSchema>;
