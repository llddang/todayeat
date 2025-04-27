import { FormEvent, useState } from 'react';
import OptionSelectCard from '@/components/commons/option-select-card';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { GenderType } from '@/types/user-personal-info.type';
import { GOAL_OPTIONS } from '../constants/funnel.constant';

type StepGenderProps = {
  userName: string;
  nextStep: (data: GenderType) => void;
};
const StepGender = ({ userName, nextStep }: StepGenderProps) => {
  const [selectedOption, setSelectedOption] = useState<GenderType | null>(null);

  const handleSelectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value as GenderType);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedOption) nextStep(selectedOption);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>
          <Typography as="h3" variant="title3" className="mb-2">
            {userName}님의 <br /> 성별을 알려주세요
          </Typography>
          <Typography as="span" variant="body2" className="text-gray-600">
            성별에 따라 기초대사량 계산이 달라져요
          </Typography>
        </legend>
        <div className="mt-8 space-y-2 pt-2">
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
          disabled={!selectedOption}
          className="fixed bottom-[calc(env(safe-area-inset-bottom,1.5rem)+1.5rem)] left-1/2 w-[calc(100%-2.5rem)] -translate-x-1/2 xl:relative xl:bottom-auto xl:left-auto xl:mt-6 xl:w-full xl:-translate-x-0"
        >
          다음
        </Button>
      </fieldset>
    </form>
  );
};

export default StepGender;
