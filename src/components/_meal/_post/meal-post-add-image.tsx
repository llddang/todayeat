import { useState } from 'react';
import MealPostAddImageButton from '@/components/_meal/_post/meal-post-add-image-button';
import MealPostAddImagePreviewGallery from '@/components/_meal/_post/meal-post-add-image-preview-gallery';

type MealPostAddImageProps = {
  initialImages?: File[];
  onImagesChange?: (files: File[]) => void;
};
const MealPostAddImage = ({ initialImages = [], onImagesChange }: MealPostAddImageProps) => {
  const [imageFiles, setImageFiles] = useState<File[]>(initialImages);

  const handleImageFilesChange = (newFiles: File[]) => {
    setImageFiles(newFiles);
    if (onImagesChange) onImagesChange(newFiles);
  };

  return (
    <div className="w-full rounded-3xl bg-white/50 p-4 backdrop-blur-[50px] [&>*:not(:last-child)]:mb-3">
      <MealPostAddImageButton imageFiles={imageFiles} handleImageFilesChange={handleImageFilesChange} />
      {imageFiles.length !== 0 && (
        <MealPostAddImagePreviewGallery imageFiles={imageFiles} handleImageFilesChange={handleImageFilesChange} />
      )}
    </div>
  );
};
export default MealPostAddImage;
