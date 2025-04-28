import { Skeleton } from '@/components/ui/skeleton';

const PieChartSkeleton = () => {
  return (
    <div className="flex items-center justify-center xl:flex-1 xl:flex-col xl:gap-10">
      <Skeleton className="h-52 w-52 rounded-full" />
      <Skeleton className="h-28 w-64" />
    </div>
  );
};

export default PieChartSkeleton;
