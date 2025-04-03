export const Gender = {
  MAN: {
    value: 'MAN', // 데이터베이스에 저장될 값
    label: '남' // 화면에 표시될 값
  },
  WOMAN: {
    value: 'WOMAN',
    label: '여'
  }
} as const;

export type GenderKey = keyof typeof Gender;
export type GenderValue = (typeof Gender)[GenderKey]['label'];
export type GenderItem = (typeof Gender)[GenderKey];

export const genderArray: GenderItem[] = Object.values(Gender);
