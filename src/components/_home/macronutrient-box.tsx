import { MACRO_COLOR_MAP } from '@/constants/common.constant';
import { getPercentage } from '@/lib/utils/nutrition-calculator.util';

type macroColorMapType = keyof typeof MACRO_COLOR_MAP;

type MacronutrientBoxProps = {
  label: macroColorMapType;
  value: number;
  goal: number;
};

const MacronutrientBox = ({ label, value, goal }: MacronutrientBoxProps) => {
  const percent = Math.min(getPercentage(value, goal), 100);
  const barColor = MACRO_COLOR_MAP[label] || 'bg-gray-300';

  return (
    <div className="flex flex-1 flex-col gap-1.5 rounded-xl bg-white p-4">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <div className="flex items-center text-nowrap text-sm text-gray-900">
        <span className="text-base font-bold">{value}</span>
        <div className="text-gray-500">
          <span className="mx-0.5">/</span>
          <span className="mr-0.5">{goal}</span>g
        </div>
      </div>

      <div className="mt-1.5 h-4 w-full overflow-hidden rounded-md bg-[#f3f3f3]">
        <div className={`h-full rounded-md ${barColor}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default MacronutrientBox;
