import { MACRO_COLOR_MAP } from '@/constants/common.constant';
import { getPercentage } from '@/lib/utils/nutrition-calculator.util';

type macroColorMapType = keyof typeof MACRO_COLOR_MAP;

type HomeMacronutrientBoxProps = {
  label: macroColorMapType;
  value: number;
  goal: number;
};

const HomeMacronutrientBox = ({ label, value, goal }: HomeMacronutrientBoxProps) => {
  const percent = Math.min(getPercentage(value, goal), 100);
  const barColor = MACRO_COLOR_MAP[label] || 'bg-gray-300';

  return (
    <div className="flex flex-1 flex-col gap-1.5 rounded-2xl bg-white p-4">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <div className="flex items-center text-nowrap text-sm">
        <span className="text-base font-bold">{value}</span>
        <div className="text-gray-500">
          <span className="mx-0.5">/</span>
          <span className="mr-0.5">{goal}</span>g
        </div>
      </div>

      <div className="my-1.5 h-2.5 w-full overflow-hidden rounded-md bg-gray-200">
        <div className={`h-full rounded-md ${barColor}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default HomeMacronutrientBox;
