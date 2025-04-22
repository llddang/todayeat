import { Typography } from '@/components/ui/typography';

type FunnelProgressSectionProps = {
  title?: string;
  percent: number;
};
const FunnelProgressSection = ({ title, percent }: FunnelProgressSectionProps) => {
  return (
    <div>
      {title && (
        <Typography as="h2" variant="subTitle4" className="flex h-10 items-center text-gray-600">
          {title}
        </Typography>
      )}
      <div className="relative h-1 w-full rounded-sm bg-gray-200">
        <span
          className="absolute left-0 top-0 block h-1 w-full transition-all bg-gradient-linear-progress"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default FunnelProgressSection;
