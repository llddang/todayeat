import { Dispatch, SetStateAction, useEffect } from 'react';
import MealPostAddImageEmptyBox from '@/components/_meal/_post/meal-post-add-image-empty-box';
import MealPostAddImagePreviewBox from '@/components/_meal/_post/meal-post-add-image-preview-box';
import { MAX_MEAL_IMAGE_COUNT } from '@/constants/meal.constant';
import { cleanupBlobUrl } from '@/lib/utils/cleanup-blob-url.util';
import { getFileId } from '@/lib/utils/file.util';

type MealPostAddImagePreviewGalleryProps = {
  imageFiles: File[];
  setImageFiles: Dispatch<SetStateAction<File[]>>;
};

const MealPostAddImagePreviewGallery = ({ imageFiles, setImageFiles }: MealPostAddImagePreviewGalleryProps) => {
  const previewImages = imageFiles.map((file) => ({ imageUrl: URL.createObjectURL(file), fileId: getFileId(file) }));
  const emptyImageCount = MAX_MEAL_IMAGE_COUNT - imageFiles.length;
  const emptyImages = Array(emptyImageCount).fill(1);

  const handleRemoveImage = (fileId: string) => {
    setImageFiles((prev) => prev.filter((file) => getFileId(file) !== fileId));
  };

  useEffect(() => {
    return () => {
      previewImages.forEach(({ imageUrl }) => cleanupBlobUrl(imageUrl));
    };
  }, [previewImages]);

  return (
    <ul className="flex w-full justify-between gap-3">
      {previewImages.map((preview, index) => (
        <MealPostAddImagePreviewBox
          key={preview.fileId}
          name={`음식 ${index}`}
          {...preview}
          onRemove={handleRemoveImage}
        />
      ))}
      {emptyImages.map((_, index) => (
        <MealPostAddImageEmptyBox key={index} />
      ))}
    </ul>
  );
};
export default MealPostAddImagePreviewGallery;
