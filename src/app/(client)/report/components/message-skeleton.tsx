import { Skeleton } from '@/components/ui/skeleton';

const MessageSkeleton = () => {
  return (
    <div className="space-y-1">
      <Skeleton className="h-[1.4rem] w-36" />
      <Skeleton className="h-[1.4rem] w-40" />
    </div>
  );
};

export default MessageSkeleton;
