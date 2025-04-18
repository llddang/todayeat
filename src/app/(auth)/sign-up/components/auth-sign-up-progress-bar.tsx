import { Typography } from '@/components/ui/typography';

// TODO: 여러 플로우에서 사용할 수 있는 공통 컴포넌트로 분리하기.

type AuthSignUpProgressBarProps = {
  title?: string;
  percent: number;
};
const AuthSignUpProgressBar = ({ title, percent }: AuthSignUpProgressBarProps) => {
  return (
    <div>
      {title && (
        <Typography as="h2" variant="subTitle4" className="flex h-10 items-center text-gray-600">
          {title}
        </Typography>
      )}
      <div className="relative h-1 w-full rounded-sm bg-gray-200">
        <span
          className="bg-gradient-linear-progress absolute left-0 top-0 block h-1 w-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default AuthSignUpProgressBar;
