import { z } from 'zod';

export const nameRegex = /^[가-힣a-zA-Z0-9]{2,12}$/;
export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!#@$%&*?]{6,16}$/;

const FormSchema = {
  NON_EMPTY_SCHEMA: z.string().nonempty('필수 입력 항목입니다.'),
  EMAIL_SCHEMA: z.string().nonempty('필수 입력 항목입니다.').email({
    message: '유효한 이메일 형식이 아닙니다.'
  }),
  NAME_SCHEMA: z
    .string()
    .nonempty('필수 입력 항목입니다.')
    .min(2, { message: '2~12자 이하의 한글/영어/숫자만 가능합니다.' })
    .max(12, { message: '2~12자 이하의 한글/영어/숫자만 가능합니다.' })
    .regex(nameRegex, { message: '특수문자, 공백이 포함 될 수 없습니다.' }),
  PASSWORD_SCHEMA: z
    .string()
    .nonempty('필수 입력 항목입니다.')
    .min(6, { message: '비밀번호는 6자리 이상 입력해주세요.' })
    .max(16, { message: '비밀번호는 16자리 이하 입력해주세요. ' })
    .regex(passwordRegex, { message: '영문, 숫자, 특수문자(!@$%^&*()를 최소 1개 이상 포함하여야 합니다. ' }),
  CONFIRM_PASSWORD_SCHEMA: z.string().nonempty('필수 입력 항목입니다.')
};

export default FormSchema;
