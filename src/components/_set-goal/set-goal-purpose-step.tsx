import OptionSelectCard from '@/components/commons/option-select-card';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { GOAL_OPTIONS } from '@/constants/set-goal.constant';
import { PurposeType } from '@/types/user-personal-info.type';
import { useState } from 'react';

type SetGoalPurposeStepProps = {
  userName: string;
  nextStep: (data: PurposeType) => void;
};

const SetGoalPurposeStep = ({ userName, nextStep }: SetGoalPurposeStepProps) => {
  const [selectedOption, setSelectedOption] = useState<PurposeType | null>(null);

  const handleSelectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value as PurposeType);
  };

  return (
    <>
      <div>
        <Typography as="h3" variant={'title2'} className="mb-2">
          {userName}님은 <br /> 어떤 목표를 가지고 계신가요?
        </Typography>
        <Typography as="span" variant={'body2'} className="text-gray-600">
          목표에 따라 칼로리와 영양소 비율이 달라져요
        </Typography>
      </div>
      <div className="space-y-2 pt-2">
        {GOAL_OPTIONS.PURPOSE.map((option) => (
          <OptionSelectCard
            key={option.value}
            groupName="PURPOSE"
            checked={selectedOption === option.value}
            onChange={(e) => handleSelectOption(e)}
            {...option}
          />
        ))}
      </div>
      <Button
        onClick={() => selectedOption && nextStep(selectedOption)}
        disabled={!selectedOption}
        className="fixed bottom-6 left-1/2 w-[calc(100%-2.5rem)] -translate-x-1/2"
      >
        다음
      </Button>
    </>
  );
};

export default SetGoalPurposeStep;
