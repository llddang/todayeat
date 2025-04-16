import OptionSelectCard from '@/components/commons/option-select-card';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { GOAL_OPTIONS } from '@/constants/set-goal.constant';
import { ActivityLevelType } from '@/types/user-personal-info.type';
import { FormEvent, useState } from 'react';

type SetGoalActivityLevelStepProps = {
  userName: string;
  nextStep: (data: ActivityLevelType) => void;
};
const SetGoalActivityLevelStep = ({ userName, nextStep }: SetGoalActivityLevelStepProps) => {
  const [selectedOption, setSelectedOption] = useState<ActivityLevelType | null>(null);

  const handleSelectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value as ActivityLevelType);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedOption) nextStep(selectedOption);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>
          <Typography as="h3" variant="title2" className="mb-2">
            {userName}님의 <br />
            평소 활동량은 어떤 편인가요?
          </Typography>
          <Typography as="span" variant="body2" className="text-gray-600">
            생활 패턴에 가장 가까운 걸 선택해 주세요
          </Typography>
        </legend>
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
        <Button disabled={!selectedOption} className="!mt-[3.75rem] w-full">
          다음
        </Button>
      </fieldset>
    </form>
  );
};

export default SetGoalActivityLevelStep;
