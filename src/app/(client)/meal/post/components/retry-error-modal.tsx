import Modal from '@/components/commons/modal';
import { Typography } from '@/components/ui/typography';
import { useRouter } from 'next/navigation';
type RetryErrorModalProps = {
  open: boolean;
  onOpenRetryErrorModalChange: (open: boolean) => void;
};

const RetryErrorModal = ({ open, onOpenRetryErrorModalChange }: RetryErrorModalProps) => {
  const router = useRouter();

  const handleRetryClick = () => {
    router.refresh();
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenRetryErrorModalChange}
      title="😅 AI가 조금 헷갈려했어요"
      content={
        <>
          <div className="flex w-full flex-col items-start gap-3 pl-1">
            <div className="flex w-full flex-col items-start gap-4 pb-1 pr-1">
              <Typography as="span" variant="body2" className="text-gray-700">
                이런 사진은 AI가 인식하기 어려워 할 수 있어요
              </Typography>
              <ul className="flex w-full flex-col items-start gap-3 rounded-xl bg-gray-100 p-5">
                <li className="flex items-center gap-2 before:block before:h-6 before:w-6 before:bg-illust-failed-img-1 before:bg-contain before:bg-center before:bg-no-repeat before:content-['']">
                  <Typography as="span" variant="body2" className="text-gray-700">
                    너무 가까이 찍은 사진
                  </Typography>
                </li>
                <li className="flex items-center gap-2 before:block before:h-6 before:w-6 before:bg-illust-failed-img-2 before:bg-contain before:bg-center before:bg-no-repeat before:content-['']">
                  <Typography as="span" variant="body2" className="text-gray-700">
                    음식보다 배경이 중심인 사진
                  </Typography>
                </li>
                <li className="flex items-center gap-2 before:block before:h-6 before:w-6 before:bg-illust-failed-img-3 before:bg-contain before:bg-center before:bg-no-repeat before:content-['']">
                  <Typography as="span" variant="body2" className="text-gray-700">
                    빛 반사가 심한 사진
                  </Typography>
                </li>
              </ul>
              <Typography as="span" variant="body2" className="text-gray-700">
                사진을 다시 업로드하거나
                <br />
                음식 이름을 직접 입력해서 찾아보세요!
              </Typography>
            </div>
          </div>
        </>
      }
      closeText=""
      confirmText="다시 시도하기"
      onConfirm={handleRetryClick}
    />
  );
};

export default RetryErrorModal;
