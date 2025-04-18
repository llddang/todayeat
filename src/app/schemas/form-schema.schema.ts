import { z } from 'zod';

export const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{6,16}$/;

const formSchema = {
  NON_EMPTY_SCHEMA: z.string().nonempty('필수 입력 항목입니다.'),
  EMAIL_SCHEMA: z.string().nonempty('필수 입력 항목입니다.').email({
    message: '유효한 이메일 형식이 아닙니다.'
  }),
  NICKNAME_SCHEMA: z
    .string()
    .nonempty('필수 입력 항목입니다.')
    .min(2, { message: '2~8자 사이의 한글/영어/숫자만 가능합니다.' })
    .max(8, { message: '2~8자 사이의 한글/영어/숫자만 가능합니다.' })
    .regex(nicknameRegex, { message: '특수문자, 공백이 포함될 수 없습니다.' }),
  PASSWORD_SCHEMA: z
    .string()
    .nonempty('필수 입력 항목입니다.')
    .min(6, { message: '비밀번호는 6자리 이상 입력해주세요.' })
    .max(16, { message: '비밀번호는 16자리 이하 입력해주세요.' })
    .regex(passwordRegex, { message: '영문, 숫자, 특수문자(~!@#$%^&*)를 최소 1개 이상 포함하여야 합니다.' }),
  CONFIRM_PASSWORD_SCHEMA: z.string().nonempty('필수 입력 항목입니다.'),
  IMAGE_FILE_SCHEMA: z.custom<File>((data) => data instanceof File, { message: '유효한 File 객체가 아닙니다.' }),
  ONLY_NUMBER_SCHEMA: z
    .string()
    .nonempty('필수 입력 항목입니다')
    .refine((value) => /^[0-9]+$/.test(value), {
      message: '0 이상의 숫자만 입력해 주세요'
    }),
  NUMBER_WITH_ONE_DECIMAL_SCHEMA: z
    .string()
    .nonempty('필수 입력 항목입니다')
    .refine((value) => /^(0|[1-9]\d*)(\.\d{1})?$/.test(value), {
      message: '0 이상의 숫자 또는 소수점 첫째 자리까지만 입력해 주세요'
    })
};

export default formSchema;
