import { useEffect } from 'react';
import Image from 'next/image';
import MealPostAddImagePreviewBox from '@/components/_meal/_post/meal-post-add-image-preview-box';
import { MAX_MEAL_IMAGE_COUNT } from '@/constants/meal.constant';
import { cleanupBlobUrl } from '@/lib/utils/cleanup-blob-url.util';
import { getFileId } from '@/lib/utils/file.util';
import PIC_LINE from '@/../public/icons/pic_line.svg';

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
      {previewImages.map((preview, index) => (
        <MealPostAddImagePreviewBox
          key={preview.fileId}
          name={`음식 ${index}`}
          {...preview}
          onRemove={handleRemoveImage}
        />
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
