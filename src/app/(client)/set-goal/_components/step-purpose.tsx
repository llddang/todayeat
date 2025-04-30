import OptionSelectCard from '@/components/commons/option-select-card';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { PurposeType } from '@/types/user-personal-info.type';
import { ChangeEvent, FormEvent, useState } from 'react';
import { GOAL_OPTIONS } from '../_constants/funnel.constant';
import { useUserStore } from '@/store/user.store';

type StepPurposeProps = {
  nextStep: (data: PurposeType) => void;
};

const StepPurpose = ({ nextStep }: StepPurposeProps) => {
  const { nickname: userName } = useUserStore((state) => state.user);
  const [selectedOption, setSelectedOption] = useState<PurposeType | null>(null);

  const handleSelectOption = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value as PurposeType);
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
            {userName}님은 <br /> 어떤 목표를 가지고 계신가요?
          </Typography>
          <Typography as="span" variant={'body2'} className="text-gray-600">
            목표에 따라 칼로리와 영양소 비율이 달라져요
          </Typography>
        </legend>
        <div className="mt-8 space-y-2 pt-2">
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
          disabled={!selectedOption}
          className="fixed bottom-[calc(env(safe-area-inset-bottom,1.5rem)+1.5rem)] left-1/2 w-[calc(100%-2.5rem)] -translate-x-1/2 xl:relative xl:bottom-auto xl:left-auto xl:mt-6 xl:w-full xl:-translate-x-0"
        >
          다음
        </Button>
      </fieldset>
    </form>
  );
};

export default StepPurpose;
