import Image from 'next/image';
import PIC_LINE from '@/../public/icons/pic_line.svg';

const MealPostAddImageEmptyBox = () => {
  return (
    <li className="flex aspect-square w-full items-center justify-center rounded-2xl bg-white/50">
      <Image src={PIC_LINE} alt="비어있는 이미지 슬롯" />
    </li>
  );
};
export default MealPostAddImageEmptyBox;
