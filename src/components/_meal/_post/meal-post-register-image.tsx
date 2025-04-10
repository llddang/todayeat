import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import ILLUSTRATION_IMAGE_UPLOAD from '@/../public/illustrations/image-upload.svg';
import PIC_LINE from '@/../public/icons/pic_line.svg';
import CLOSE_LINE from '@/../public/icons/close_line.svg';
import Image from 'next/image';
import { cleanupBlobUrl } from '@/lib/utils/cleanup-blob-url.util';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const MAX_MEAL_IMAGE = 3;

type MealPostRegisterImageProps = {
  imageFiles: File[];
  setImageFiles: Dispatch<SetStateAction<File[]>>;
};
const MealPostRegisterImage = ({ setImageFiles, imageFiles }: MealPostRegisterImageProps) => {
  const previewImages = imageFiles.map((file) => ({ imageUrl: URL.createObjectURL(file), fileId: getFileId(file) }));
  const emptyImageCount = MAX_MEAL_IMAGE - imageFiles.length;
  const emptyImages = Array(emptyImageCount).fill(1);

  console.log(previewImages.length, emptyImageCount);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    e.target.value = '';

    if (fileArray.length + previewImages.length > MAX_MEAL_IMAGE) return alert('3장까지 첨부 가능합니다.');

    const hasOverSizeFile = fileArray.some((file) => file.size >= MAX_FILE_SIZE);
    if (hasOverSizeFile) return alert('10MB 이하의 파일을 첨부해주세요.');

    const hasDuplicatedImage = fileArray.filter((file) =>
      previewImages.some(({ fileId }) => fileId === getFileId(file))
    );
    if (hasDuplicatedImage.length > 0) return alert('동일한 이미지를 업로드할 수 없습니다.');

    setImageFiles((prev) => [...prev, ...fileArray]);
  };

  const handleRemovePreviewImage = (fileId: string) => {
    setImageFiles((prev) => prev.filter((file) => getFileId(file) !== fileId));
  };

  useEffect(() => {
    return () => {
      previewImages.forEach(({ imageUrl }) => cleanupBlobUrl(imageUrl));
    };
  }, [previewImages]);

  return (
    <div className="w-full space-y-3 rounded-3xl bg-white/50 p-4 backdrop-blur-[50px]">
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
        <Image src={ILLUSTRATION_IMAGE_UPLOAD} alt="이미지 업로드 이미지" className="h-10 w-10" />
        <span className="tracking-snug text-sm leading-[140%] text-gray-600">사진은 최대 3개까지 등록 가능합니다.</span>
      </button>
      <ol className="flex w-full justify-between gap-3">
        {previewImages.map(({ imageUrl, fileId }, index) => (
          <div
            key={fileId}
            className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl"
          >
            <Image
              src={imageUrl}
              alt={`식단 기록 이미지 ${index}`}
              width="100"
              height="100"
              className="h-full w-full object-cover"
            />
            <button
              onClick={() => handleRemovePreviewImage(fileId)}
              className="absolute right-[0.37rem] top-[0.37rem] rounded-full bg-white/80 p-1.5"
            >
              <Image src={CLOSE_LINE} alt="닫기 이모지" className="h-3 w-3" />
            </button>
          </div>
        ))}
        {emptyImages.map((_, index) => (
          <EmptyImage key={index} />
        ))}
      </ol>
    </div>
  );
};
export default MealPostRegisterImage;

const getFileId = (file: File): string => {
  const fileInfo = [file.name, file.size.toString(), file.lastModified.toString(), file.type].join('|');

  let hash = 0;
  for (let i = 0; i < fileInfo.length; i++) {
    const char = fileInfo.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return `${hash.toString(16)}-${file.size}-${file.name.replace(/\s+/g, '_')}`;
};

const EmptyImage = () => {
  return (
    <li className="flex aspect-square w-full items-center justify-center rounded-2xl bg-white/50">
      <Image src={PIC_LINE} alt="사진 아이콘" />
    </li>
  );
};
