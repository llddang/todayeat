import MyPageMacroNutrientBox from '@/components/_my-page/my-page-macronutrient-box';
import MyPageUserInfoList from '@/components/_my-page/my-page-user-info-list';
import ButtonLink from '@/components/commons/button-link';
import { Typography } from '@/components/ui/typography';
import SITE_MAP from '@/constants/site-map.constant';
import { NUTRITION_PURPOSE_OPTIONS_IN_PROFILE } from '@/constants/user-personal-info.constant';
import { formatNumberWithComma } from '@/lib/utils/format-number-with-comma';
import { getPercentage } from '@/lib/utils/nutrition-calculator.util';
import { UserDTO } from '@/types/DTO/user.dto';

type MyPageUserGoalCardProps = {
  userInfo: UserDTO;
};

const MyPageUserGoalCard = ({ userInfo }: MyPageUserGoalCardProps) => {
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
          <MyPageUserInfoList title="건강 목표" description={NUTRITION_PURPOSE_OPTIONS_IN_PROFILE[purpose].name} />
          <MyPageUserInfoList
            title="1일 목표 칼로리"
            description={`${formatNumberWithComma(dailyCaloriesGoal)} kcal`}
          />
          <MyPageUserInfoList title="목표 기준 탄단지 비율" description={calculateMacroRatio()} />
        </ul>
        <MyPageMacroNutrientBox
          dailyProteinGoal={dailyProteinGoal}
          dailyCarbohydrateGoal={dailyCarbohydrateGoal}
          dailyFatGoal={dailyFatGoal}
        />
      </div>
    </div>
  );
};

export default MyPageUserGoalCard;
