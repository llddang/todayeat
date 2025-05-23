'use client';
import { ChangeEvent, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user.store';
import { cleanupBlobUrl } from '@/utils/cleanup-blob-url.util';
import SITE_MAP from '@/constants/site-map.constant';
import PIC_LINE from '@/../public/icons/pic_line.svg';
import CLOSE_LINE from '@/../public/icons/close_line.svg';
import { getFileId } from '../../_utils/file.util';
import Modal from '@/components/commons/modal';

type AddImageListProps = {
  onImagesChange?: (files: File[]) => void;
};

const AddImageList = ({ onImagesChange }: AddImageListProps) => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: ''
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const previewImages = useMemo<ImagePreview[]>(
    () =>
      imageFiles.map((file) => ({
        imageUrl: URL.createObjectURL(file),
        fileId: getFileId(file)
      })),
    [imageFiles]
  );

  const emptyImageCount = MAX_MEAL_IMAGE_COUNT - imageFiles.length;
  const emptyImages = Array(emptyImageCount).fill(1);

  const handleImageFilesChange = (newFiles: File[]) => {
    setImageFiles(newFiles);
    if (onImagesChange) onImagesChange(newFiles);
  };

  const handleRemoveImage = (fileId: string) => {
    handleImageFilesChange(imageFiles.filter((file) => getFileId(file) !== fileId));
  };

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    e.target.value = '';

    const validationError = validateFiles(fileArray, imageFiles);
    if (validationError) {
      setModalInfo({
        title: validationError
      });
      return setIsModalOpen(true);
    }

    handleImageFilesChange([...imageFiles, ...fileArray]);
  };

  const handleUploadButtonClick = (e: MouseEvent) => {
    e.preventDefault();

    if (!user.id) {
      setModalInfo({
        title: ALERT_MESSAGES.LOGIN_REQUIRED
      });
      setIsModalOpen(true);
      return router.push(SITE_MAP.SIGN_IN);
    }

    inputFileRef.current?.click();
  };

  useEffect(() => {
    return () => {
      previewImages.forEach(({ imageUrl }) => cleanupBlobUrl(imageUrl));
    };
  }, [previewImages]);

  return (
    <div className="w-full rounded-3xl bg-white/50 p-4 backdrop-blur-[50px] [&>*:not(:last-child)]:mb-3">
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
        onClick={handleUploadButtonClick}
        className="relative flex w-full flex-col items-center gap-4 rounded-2xl bg-white px-4 py-7 before:h-10 before:w-10 before:bg-image-upload-illustration before:bg-contain before:bg-no-repeat before:content-['']"
      >
        <span className="text-sm leading-[140%] tracking-snug text-gray-600">사진은 최대 3개까지 등록 가능합니다</span>
      </button>

      {imageFiles.length > 0 && (
        <ul className="flex w-full gap-3">
          {previewImages.map(({ imageUrl, fileId }, index) => (
            <li
              key={fileId}
              className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl"
            >
              <Image
                src={imageUrl}
                alt={`음식 ${index + 1}`}
                width="100"
                height="100"
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => handleRemoveImage(fileId)}
                className="absolute right-[0.37rem] top-[0.37rem] rounded-full bg-white/80 p-1.5 backdrop-blur-[10px]"
              >
                <Image src={CLOSE_LINE} alt="닫기 아이콘" className="h-3 w-3" />
              </button>
            </li>
          ))}
          {emptyImages.map((_, index) => (
            <li
              key={`empty-${index}`}
              className="flex aspect-square w-full items-center justify-center rounded-2xl bg-white/50"
            >
              <Image src={PIC_LINE} alt="비어있는 이미지 슬롯" />
            </li>
          ))}
        </ul>
      )}
      <Modal title={modalInfo.title} content="" open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default AddImageList;

type ImagePreview = {
  imageUrl: string;
  fileId: string;
};

const KB = 1024;
const MB = 1024 * KB;
const MAX_FILE_SIZE = 10 * MB;
const MAX_MEAL_IMAGE_COUNT = 3;

const ALERT_MESSAGES = {
  MAX_COUNT_EXCEEDED: '3장까지 첨부 가능합니다.',
  FILE_TOO_LARGE: '10MB 이하의 파일을 첨부해주세요.',
  DUPLICATE_IMAGE: '동일한 이미지를 업로드할 수 없습니다.',
  LOGIN_REQUIRED: '로그인이 필요한 서비스입니다.'
};

const validateFiles = (newFiles: File[], imageFiles: File[]): string | null => {
  if (newFiles.length + imageFiles.length > MAX_MEAL_IMAGE_COUNT) {
    return ALERT_MESSAGES.MAX_COUNT_EXCEEDED;
  }

  const hasOverSizeFile = newFiles.some((file) => file.size > MAX_FILE_SIZE);
  if (hasOverSizeFile) {
    return ALERT_MESSAGES.FILE_TOO_LARGE;
  }

  const hasDuplicatedImage = newFiles.some((newFile) =>
    imageFiles.some((existingFile) => getFileId(existingFile) === getFileId(newFile))
  );
  if (hasDuplicatedImage) {
    return ALERT_MESSAGES.DUPLICATE_IMAGE;
  }

  return null;
};
