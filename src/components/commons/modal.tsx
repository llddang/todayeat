import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle
} from '@radix-ui/react-alert-dialog';

type InformationModalProps = {
  title: string;
  description: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
};

const Modal = ({ title, description, open, onOpenChange, onConfirm }: InformationModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogPortal>
        <AlertDialogOverlay
          onClick={() => onConfirm?.()}
          className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <AlertDialogContent className="fixed left-[50%] top-[50%] z-50 grid w-fit min-w-[22rem] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-6 rounded-2xl bg-background bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <div className="space-y-3 pl-1 text-left">
            <AlertDialogTitle>
              <Typography variant="title2" className="text-gray-900">
                {title}
              </Typography>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Typography as="span" variant="body2" className="whitespace-nowrap text-gray-700">
                {description}
              </Typography>
            </AlertDialogDescription>
          </div>
          <Button
            onClick={() => {
              onConfirm?.();
              onOpenChange(false);
            }}
            variant="secondary"
          >
            닫기
          </Button>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};
export default Modal;
