import { Skeleton } from '@/components/ui/skeleton';

const PieChartSkeleton = () => {
  return (
    <div className="flex flex-1 items-center justify-center gap-14 py-6 xl:flex-col xl:py-0">
      <Skeleton className="h-40 w-40 rounded-full border-[1.6rem] border-solid bg-transparent xl:h-52 xl:w-52 xl:border-[2rem]" />
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-20 xl:w-56" />
        </div>
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-20 xl:w-56" />
        </div>
        <div className="flex items-center justify-center gap-4">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-20 xl:w-56" />
        </div>
      </div>
    </div>
  );
};

export default PieChartSkeleton;
