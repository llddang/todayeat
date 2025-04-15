import OptionSelectCard from '@/components/commons/option-select-card';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { GOAL_OPTIONS } from '@/constants/set-goal.constant';
import { ActivityLevelType } from '@/types/user-personal-info.type';
import { useState } from 'react';

type SetGoalActivityLevelStepProps = {
  userName: string;
  nextStep: (data: ActivityLevelType) => void;
};
const SetGoalActivityLevelStep = ({ userName, nextStep }: SetGoalActivityLevelStepProps) => {
  const [selectedOption, setSelectedOption] = useState<ActivityLevelType | null>(null);

  const handleSelectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value as ActivityLevelType);
  };
  return (
    <>
      <div>
        <Typography as="h3" variant={'title2'} className="mb-2">
          {userName}님은 <br />
          어떤 목표를 가지고 계신가요?
        </Typography>
        <Typography as="span" variant={'body2'} className="text-gray-600">
          목표에 따라 칼로리와 영양소 비율이 달라져요
        </Typography>
      </div>
      <div className="space-y-2 pt-2">
        {GOAL_OPTIONS.ACTIVITY_LEVEL_OPTIONS.map((option) => (
          <OptionSelectCard
            key={option.value}
            groupName="ACTIVITY_LEVEL_OPTIONS"
            checked={selectedOption === option.value}
            onChange={(e) => handleSelectOption(e)}
            {...option}
          />
        ))}
      </div>
      <Button
        onClick={() => selectedOption && nextStep(selectedOption)}
        disabled={!selectedOption}
        className="!mt-[3.75rem] w-full"
      >
        다음
      </Button>
    </>
  );
};

export default SetGoalActivityLevelStep;
