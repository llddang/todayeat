import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

type InformationModalProps = {
  title: string;
  description: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const InformationModal = ({ title, description, open, onOpenChange }: InformationModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-fit min-w-[22rem] gap-6 rounded-2xl bg-white p-6">
        <AlertDialogHeader className="space-y-3 pl-1 text-left">
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
        </AlertDialogHeader>
        <Button onClick={() => onOpenChange(false)} variant="secondary">
          닫기
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default InformationModal;
