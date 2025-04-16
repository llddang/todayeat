import { Typography } from '@/components/ui/typography';

type SetGoalProgressSectionProps = {
  percent: number;
};

const SetGoalProgressSection = ({ percent }: SetGoalProgressSectionProps) => {
  return (
    // TODO 공통 컴포넌트화
    <div>
      <Typography as="h2" variant="subTitle4" className="flex h-10 items-center text-gray-600">
        목표 설정하기
      </Typography>
      <div className="relative h-1 w-full rounded-sm bg-gray-200">
        <span
          className="absolute left-0 top-0 block h-1 w-full transition-all bg-gradient-linear-progress"
          style={{ width: `${percent}%` }}
        ></span>
      </div>
    </div>
  );
};

export default SetGoalProgressSection;
