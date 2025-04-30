'use client';

import Modal from '@/components/commons/modal';

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
    <Modal
      title="이전 정보 발견"
      content="등록하던 정보가 있습니다. 사용하시겠습니까?"
      open={open}
      onOpenChange={onOpenChange}
      confirmText="예"
      onConfirm={onApproveClickHandler}
      closeText="아니요"
      onClose={onCancelClickHandler}
    />
  );
};

export default RestoreAnalysisModal;
