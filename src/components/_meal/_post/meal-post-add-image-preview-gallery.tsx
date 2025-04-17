import { useEffect } from 'react';
import Image from 'next/image';
import { MAX_MEAL_IMAGE_COUNT } from '@/constants/meal.constant';
import { cleanupBlobUrl } from '@/lib/utils/cleanup-blob-url.util';
import { getFileId } from '@/lib/utils/file.util';
import PIC_LINE from '@/../public/icons/pic_line.svg';
import CLOSE_LINE from '@/../public/icons/close_line.svg';

type MealPostAddImagePreviewGalleryProps = {
  imageFiles: File[];
  handleImageFilesChange: (files: File[]) => void;
};

const MealPostAddImagePreviewGallery = ({
  imageFiles,
  handleImageFilesChange
}: MealPostAddImagePreviewGalleryProps) => {
  const previewImages = imageFiles.map((file) => ({ imageUrl: URL.createObjectURL(file), fileId: getFileId(file) }));
  const emptyImageCount = MAX_MEAL_IMAGE_COUNT - imageFiles.length;
  const emptyImages = Array(emptyImageCount).fill(1);

  const handleRemoveImage = (fileId: string) => {
    handleImageFilesChange(imageFiles.filter((file) => getFileId(file) !== fileId));
  };

  // WARN: react strict mode에서 제대로 동작하지 않을 수 있음.
  useEffect(() => {
    return () => {
      previewImages.forEach(({ imageUrl }) => cleanupBlobUrl(imageUrl));
    };
  }, [previewImages]);

  return (
    <ul className="flex w-full gap-3">
      {previewImages.map(({ imageUrl, fileId }, index) => (
        <div
          key={fileId}
          className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl"
        >
          <Image
            src={imageUrl}
            alt={`음식 ${index} 이미지`}
            width="100"
            height="100"
            className="h-full w-full object-cover"
          />
          <button
            onClick={() => handleRemoveImage(fileId)}
            className="absolute right-[0.37rem] top-[0.37rem] rounded-full bg-white/80 p-1.5 backdrop-blur-[10px]"
          >
            <Image src={CLOSE_LINE} alt="닫기 이모지" className="h-3 w-3" />
          </button>
        </div>
      ))}
      {emptyImages.map((_, index) => (
        <li key={index} className="flex aspect-square w-full items-center justify-center rounded-2xl bg-white/50">
          <Image src={PIC_LINE} alt="비어있는 이미지 슬롯" />
        </li>
      ))}
    </ul>
  );
};
export default MealPostAddImagePreviewGallery;
