import Image from 'next/image';
import CLOSE_LINE from '@/../public/icons/close_line.svg';

type MealPostAddImagePreviewBoxProps = {
  imageUrl: string;
  name: string;
  fileId: string;
  onRemove: (fileId: string) => void;
};
const MealPostAddImagePreviewBox = ({ imageUrl, name, fileId, onRemove }: MealPostAddImagePreviewBoxProps) => {
  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl">
      <Image src={imageUrl} alt={`${name} 이미지`} width="100" height="100" className="h-full w-full object-cover" />
      <button
        onClick={() => onRemove(fileId)}
        className="absolute right-[0.37rem] top-[0.37rem] rounded-full bg-white/80 p-1.5 backdrop-blur-[10px]"
      >
        <Image src={CLOSE_LINE} alt="닫기 이모지" className="h-3 w-3" />
      </button>
    </div>
  );
};
export default MealPostAddImagePreviewBox;
