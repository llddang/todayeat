import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import IMAGE_UPLOAD from '@/../public/illustrations/image-upload.svg';
import { getFileId } from '@/lib/utils/file.util';
import { MAX_FILE_SIZE, MAX_MEAL_IMAGE_COUNT } from '@/constants/meal.constant';

type MealPostAddImageButtonProps = {
  imageFiles: File[];
  setImageFiles: Dispatch<SetStateAction<File[]>>;
};
const MealPostAddImageButton = ({ imageFiles, setImageFiles }: MealPostAddImageButtonProps) => {
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

    setImageFiles((prev) => [...prev, ...fileArray]);
  };

  return (
    <>
      <label className="sr-only">음식 이미지</label>
      <input
        ref={inputFileRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleInputFileChange}
        className="hidden"
      />
      <button
        onClick={() => inputFileRef.current?.click()}
        className="flex w-full flex-col items-center gap-4 rounded-2xl bg-white px-4 py-7"
      >
        <Image
          src={IMAGE_UPLOAD}
          alt="이미지 업로드 일러스트"
          className={`h-10 w-10 ${imageFiles.length === MAX_MEAL_IMAGE_COUNT && 'opacity-30 mix-blend-luminosity'}`}
        />
        <span className="tracking-snug text-sm leading-[140%] text-gray-600">사진은 최대 3개까지 등록 가능합니다.</span>
      </button>
    </>
  );
};
export default MealPostAddImageButton;
