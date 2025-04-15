import { PersonalMacronutrientData } from '@/components/_set-goal/set-goal-caculate-step';
import { Typography } from '@/components/ui/typography';
import { MACRO_COLOR_MAP } from '@/constants/common.constant';

type SetGoalMacronutrientBoxProps = {
  label: string;
  data: PersonalMacronutrientData;
};

const SetGoalMacronutrientBox = ({ label, data }: SetGoalMacronutrientBoxProps) => {
  const barColor = MACRO_COLOR_MAP[label] || 'bg-gray-300';
  return (
    <div className="flex flex-1 flex-col gap-1.5 rounded-2xl bg-white p-4">
      <Typography as="span" variant="body3" className="text-gray-600">
        {label}
      </Typography>
      <div className="flex items-center gap-[0.12rem] text-nowrap">
        <Typography as="span" variant="subTitle2">
          {data.grams}g
        </Typography>
        <Typography as="span" variant="body3" className="text-gray-500">
          /
        </Typography>
        <Typography as="span" variant="body3" className="text-gray-500">
          {data.percentage}%
        </Typography>
      </div>

      <div className="my-1.5 h-2.5 w-full overflow-hidden rounded-md bg-gray-200">
        <div className={`h-full rounded-md ${barColor}`} style={{ width: `${data.percentage}%` }}></div>
      </div>
    </div>
  );
};

export default SetGoalMacronutrientBox;
