import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
type RetryErrorModalProps = {
  open: boolean;
  onOpenRetryErrorModalChange: (open: boolean) => void;
};

const RetryErrorModal = ({ open, onOpenRetryErrorModalChange }: RetryErrorModalProps) => {
  const router = useRouter();

  const handleRetryClick = () => {
    onOpenRetryErrorModalChange(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenRetryErrorModalChange}>
      <DialogOverlay className="fixed inset-0 z-layout flex items-center justify-center bg-black/50">
        <DialogContent className="absolute left-1/2 top-1/2 z-[20] flex w-[22.0625rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 rounded-2xl bg-white p-6">
          <div className="flex w-full flex-col items-start gap-3 pl-1">
            <DialogTitle className="flex w-full items-start gap-2">
              <Typography as="span" variant="title3">
                😅 AI가 조금 헷갈려했어요
              </Typography>
            </DialogTitle>
            <div className="flex w-full flex-col items-start gap-4 pb-1 pr-1">
              <Typography as="span" variant="body2" className="text-gray-700">
                이런 사진은 AI가 인식하기 어려워 할 수 있어요
              </Typography>
              <div className="flex w-full flex-col items-start gap-3 rounded-xl bg-gray-100 p-5">
                <div className="before:bg-illust-failed-img-1 flex items-center gap-2 before:block before:h-6 before:w-6 before:bg-contain before:bg-center before:bg-no-repeat before:content-['']">
                  <Typography as="span" variant="body2" className="text-gray-700">
                    너무 가까이 찍은 사진
                  </Typography>
                </div>
                <div className="before:bg-illust-failed-img-2 flex items-center gap-2 before:block before:h-6 before:w-6 before:bg-contain before:bg-center before:bg-no-repeat before:content-['']">
                  <Typography as="span" variant="body2" className="text-gray-700">
                    음식보다 배경이 중심인 사진
                  </Typography>
                </div>
                <div className="before:bg-illust-failed-img-3 flex items-center gap-2 before:block before:h-6 before:w-6 before:bg-contain before:bg-center before:bg-no-repeat before:content-['']">
                  <Typography as="span" variant="body2" className="text-gray-700">
                    빛 반사가 심한 사진
                  </Typography>
                </div>
              </div>
              <Typography as="span" variant="body2" className="text-gray-700">
                사진을 다시 업로드하거나
                <br />
                음식 이름을 직접 입력해서 찾아보세요!
              </Typography>
            </div>
          </div>
          <Button variant="primary" onClick={handleRetryClick} className="w-full">
            다시 시도하기
          </Button>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default RetryErrorModal;
