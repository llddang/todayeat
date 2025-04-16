import { ChangeEvent, useRef } from 'react';
import { getFileId } from '@/lib/utils/file.util';
import { MAX_FILE_SIZE, MAX_MEAL_IMAGE_COUNT } from '@/constants/meal.constant';

type MealPostAddImageButtonProps = {
  imageFiles: File[];
  handleImageFilesChange: (files: File[]) => void;
};
const MealPostAddImageButton = ({ imageFiles, handleImageFilesChange }: MealPostAddImageButtonProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    e.target.value = '';

    if (fileArray.length + imageFiles.length > MAX_MEAL_IMAGE_COUNT) return alert('3장까지 첨부 가능합니다.');

    const hasOverSizeFile = fileArray.some((file) => file.size >= MAX_FILE_SIZE);
    if (hasOverSizeFile) return alert('10MB 이하의 파일을 첨부해주세요.');

    const hasDuplicatedImage = fileArray.filter((newFile) =>
      imageFiles.some((existingFile) => getFileId(existingFile) === getFileId(newFile))
    );
    if (hasDuplicatedImage.length > 0) return alert('동일한 이미지를 업로드할 수 없습니다.');

    handleImageFilesChange([...imageFiles, ...fileArray]);
  };

  return (
    <>
      <label htmlFor="meal-image" className="sr-only">
        음식 이미지
      </label>
      <input
        ref={inputFileRef}
        name="meal-image"
        type="file"
        multiple
        accept="image/*"
        onChange={handleInputFileChange}
        className="hidden"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          inputFileRef.current?.click();
        }}
        className="relative flex w-full flex-col items-center gap-4 rounded-2xl bg-white px-4 py-7 before:h-10 before:w-10 before:bg-image-upload-illustration before:bg-contain before:bg-no-repeat before:content-['']"
      >
        <span className="text-sm leading-[140%] tracking-snug text-gray-600">사진은 최대 3개까지 등록 가능합니다</span>
      </button>
    </>
  );
};
export default MealPostAddImageButton;
