import UserInfoList from './user-info-list';
import ButtonLink from '@/components/commons/button-link';
import { Typography } from '@/components/ui/typography';
import SITE_MAP from '@/constants/site-map.constant';
import { NUTRITION_PURPOSE_OPTIONS } from '@/constants/user-personal-info.constant';
import { getPercentage } from '@/utils/nutrition-calculator.util';
import { UserDTO } from '@/types/DTO/user.dto';
import MacronutrientCard from './macronutrient-card';
import { formatNumberWithComma } from '@/utils/format.util';

type UserGoalCardProps = {
  userInfo: UserDTO;
};

const NUTRITION_PURPOSE_OPTIONS_IN_PROFILE = {
  ...NUTRITION_PURPOSE_OPTIONS,
  NOT_SET: {
    name: '미설정',
    factor: 0,
    ratio: {
      carbohydrate: 0,
      protein: 0,
      fat: 0
    }
  }
};

const UserGoalCard = ({ userInfo }: UserGoalCardProps) => {
  const {
    purpose = 'NOT_SET',
    dailyCaloriesGoal = 0,
    dailyProteinGoal = 0,
    dailyCarbohydrateGoal = 0,
    dailyFatGoal = 0
  } = userInfo.personalInfo ?? {};

  const calculateMacroRatio = () => {
    const total = dailyCarbohydrateGoal + dailyProteinGoal + dailyFatGoal;

    if (total === 0) return '0 : 0 : 0';

    const carbRatio = getPercentage(dailyCarbohydrateGoal, total);
    const proteinRatio = getPercentage(dailyProteinGoal, total);
    const fatRatio = getPercentage(dailyFatGoal, total);

    return `${carbRatio} : ${proteinRatio} : ${fatRatio}`;
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white px-4 py-3">
      <div className="flex items-center justify-between border-b-[1px] border-gray-200 pb-2 pl-1">
        <Typography as="h3" variant="subTitle2" className="text-gray-800">
          내 건강 목표
        </Typography>
        <ButtonLink href={SITE_MAP.SET_GOAL} variant="icon" size="sm" className="h-10 py-0">
          목표 수정하기
        </ButtonLink>
      </div>
      <div className="pt-3">
        <ul className="flex flex-col gap-2">
          <UserInfoList title="건강 목표" description={NUTRITION_PURPOSE_OPTIONS_IN_PROFILE[purpose].name} />
          <UserInfoList title="1일 목표 칼로리" description={`${formatNumberWithComma(dailyCaloriesGoal)} kcal`} />
          <UserInfoList title="목표 기준 탄단지 비율" description={calculateMacroRatio()} />
        </ul>
        <MacronutrientCard
          dailyProteinGoal={dailyProteinGoal}
          dailyCarbohydrateGoal={dailyCarbohydrateGoal}
          dailyFatGoal={dailyFatGoal}
        />
      </div>
    </div>
  );
};

export default UserGoalCard;
