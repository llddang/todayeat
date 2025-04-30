import UserInfoList from './user-info-list';
import ButtonLink from '@/components/commons/button-link';
import { Typography } from '@/components/ui/typography';
import SITE_MAP from '@/constants/site-map.constant';
import { NUTRITION_PURPOSE_OPTIONS } from '@/constants/user-personal-info.constant';
import { UserPersonalInfoDTO } from '@/types/DTO/user.dto';
import MacronutrientCard from './macronutrient-card';
import { formatNumberWithComma } from '@/utils/format.util';
import { calculateMacronutrientRatio } from '../_utils/calculate-macronutrient-ratio.util';

type UserGoalCardProps = {
  userInfo: UserPersonalInfoDTO | null;
};

const UserGoalCard = ({ userInfo }: UserGoalCardProps) => {
  const { purpose, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydrateGoal, dailyFatGoal } =
    userInfo ?? defaultUserInfo;

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
          <UserInfoList
            title="건강 목표"
            description={NUTRITION_PURPOSE_OPTIONS_IN_PROFILE[purpose as NutritionPurposeKey].name}
          />
          <UserInfoList title="1일 목표 칼로리" description={`${formatNumberWithComma(dailyCaloriesGoal)} kcal`} />
          <UserInfoList
            title="목표 기준 탄단지 비율"
            description={calculateMacronutrientRatio(dailyCarbohydrateGoal, dailyProteinGoal, dailyFatGoal)}
          />
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

const defaultUserInfo = {
  purpose: 'NOT_SET',
  dailyCaloriesGoal: 0,
  dailyProteinGoal: 0,
  dailyCarbohydrateGoal: 0,
  dailyFatGoal: 0
};

type NutritionPurposeKey = keyof typeof NUTRITION_PURPOSE_OPTIONS | 'NOT_SET';

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
