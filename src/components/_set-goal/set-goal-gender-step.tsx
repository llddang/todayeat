import { useState } from 'react';
import OptionSelectCard from '@/components/commons/option-select-card';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { GOAL_OPTIONS } from '@/constants/set-goal.constant';
import { GenderType } from '@/types/user-personal-info.type';

type SetGoalGenderStepProps = {
  userName: string;
  nextStep: (data: GenderType) => void;
};
const SetGoalGenderStep = ({ userName, nextStep }: SetGoalGenderStepProps) => {
  const [selectedOption, setSelectedOption] = useState<GenderType | null>(null);

  const handleSelectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value as GenderType);
  };
  return (
    <>
      <div>
        <Typography as="h3" variant={'title2'} className="mb-2">
          {userName}님의 <br /> 성별을 알려주세요
        </Typography>
        <Typography as="span" variant={'body2'} className="text-gray-600">
          성별에 따라 기초대사량 계산이 달라져요
        </Typography>
      </div>
      <div className="space-y-2 pt-2">
        {GOAL_OPTIONS.GENDER.map((option) => (
          <OptionSelectCard
            key={option.value}
            groupName="GENDER"
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

export default SetGoalGenderStep;
