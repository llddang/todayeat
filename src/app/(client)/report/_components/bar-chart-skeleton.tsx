import { Skeleton } from '@/components/ui/skeleton';

const BarChartSkeleton = () => {
  return (
    <div className="mb-12 flex flex-col gap-12 xl:mb-10 xl:gap-8">
      <div className="space-y-2">
        <Skeleton className="h-4 w-52" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
    </div>
  );
};

export default BarChartSkeleton;
