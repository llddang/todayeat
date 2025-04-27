import { isValidElement, ReactNode } from 'react';
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
import { cn } from '@/lib/shadcn';

type InformationModalProps = {
  title: string;
  content?: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closeText?: string;
  onClose?: () => void;
  confirmText?: string;
  onConfirm?: () => void;
  className?: string;
};

const Modal = ({
  title,
  content,
  open,
  onOpenChange,
  closeText = '닫기',
  onClose,
  confirmText,
  onConfirm,
  className
}: InformationModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogPortal>
        <AlertDialogOverlay
          onClick={() => onClose?.()}
          className="z-modal fixed inset-0 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <AlertDialogContent
          className={cn(
            'fixed left-[50%] top-[50%] z-50 grid w-fit min-w-[22rem] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-6 rounded-2xl bg-background bg-white p-6 duration-200',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
            className
          )}
        >
          <div className="space-y-3 pl-1 text-left">
            <AlertDialogTitle asChild>
              <Typography as="h3" variant="title2" className="text-gray-900">
                {title}
              </Typography>
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              {content &&
                (isValidElement(content) ? (
                  content
                ) : (
                  <Typography variant="body2" className="text-gray-700">
                    {content}
                  </Typography>
                ))}
            </AlertDialogDescription>
          </div>
          <div className="flex w-full gap-2">
            {closeText && (
              <Button
                onClick={() => {
                  onClose?.();
                  onOpenChange(false);
                }}
                variant="secondary"
                className="flex-1"
              >
                {closeText}
              </Button>
            )}
            {confirmText && (
              <Button
                onClick={() => {
                  onConfirm?.();
                  onOpenChange(false);
                }}
                className="flex-1"
              >
                {confirmText}
              </Button>
            )}
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};
export default Modal;
