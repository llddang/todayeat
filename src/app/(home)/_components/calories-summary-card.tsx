import { CIRCUMFERENCE, RADIUS } from '@/app/(home)/_constants/ai-feedback.constant';
import { formatNumberWithComma } from '@/utils/format.util';
import { getPercentage } from '@/utils/nutrition-calculator.util';

type CalorieSummaryCardProps = {
  total: number;
  goal: number;
};

const CaloriesSummaryCard = ({ total, goal }: CalorieSummaryCardProps) => {
  const percentage = getPercentage(total, goal);
  const offset = CIRCUMFERENCE - (CIRCUMFERENCE * percentage) / 100;

  const handleFeedbackMessage = () => {
    if (total < goal) return `${goal - total}kcal 더 먹을 수 있어요`;
    else if (goal <= 0) return '';
    else if (total === goal) return '목표를 달성했어요';
    else return `${total - goal}kcal 더 먹었어요`;
  };

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4">
      <div>
        <h3 className="mb-1 text-[13px] text-gray-550">총 섭취 칼로리</h3>
        <span className="mb-2 block text-4xl font-bold">{formatNumberWithComma(total)}</span>
        <p className="mb-1 text-sm text-gray-550">
          1일 목표 칼로리<span className="ml-1 font-semibold">{formatNumberWithComma(goal)}</span>
        </p>
        <p className="text-sm font-medium">{handleFeedbackMessage()}</p>
      </div>
      <div className="relative h-[6.25rem] w-[6.25rem]">
        <svg className="rotate-90 transform" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={RADIUS} stroke="#f3f3f3" strokeWidth="10" fill="none" />
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            stroke="#FFE37E"
            strokeWidth="10"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default CaloriesSummaryCard;
