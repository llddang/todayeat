'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type RestoreAnalysisModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApproveClickHandler: () => void;
  onCancelClickHandler: () => void;
};
const RestoreAnalysisModal = ({
  open,
  onOpenChange,
  onApproveClickHandler,
  onCancelClickHandler
}: RestoreAnalysisModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>이전 정보 발견</AlertDialogTitle>

          <AlertDialogDescription>등록하던 정보가 있습니다. 사용하시겠습니까?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-2">
          <Button variant="primary" onClick={onApproveClickHandler}>
            예
          </Button>
          <Button variant="secondary" onClick={onCancelClickHandler}>
            아니요
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RestoreAnalysisModal;
