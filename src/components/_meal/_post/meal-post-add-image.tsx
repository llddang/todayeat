import { Dispatch, SetStateAction } from 'react';
import MealPostAddImageButton from '@/components/_meal/_post/meal-post-add-image-button';
import MealPostAddImagePreviewGallery from '@/components/_meal/_post/meal-post-add-image-preview-gallery';

type MealPostAddImageProps = {
  imageFiles: File[];
  setImageFiles: Dispatch<SetStateAction<File[]>>;
};
const MealPostAddImage = ({ setImageFiles, imageFiles }: MealPostAddImageProps) => {
  return (
    <div className="w-full rounded-3xl bg-white/50 p-4 backdrop-blur-[50px] [&>*:not(:last-child)]:mb-3">
      <MealPostAddImageButton imageFiles={imageFiles} setImageFiles={setImageFiles} />
      {imageFiles.length !== 0 && (
        <MealPostAddImagePreviewGallery imageFiles={imageFiles} setImageFiles={setImageFiles} />
      )}
    </div>
  );
};
export default MealPostAddImage;
