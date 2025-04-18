import { UserDTO } from '@/types/DTO/user.dto';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Typography } from '@/components/ui/typography';
import { ACTIVITY_LEVEL_OPTIONS, GENDER_OPTIONS } from '@/constants/user-personal-info.constant';
import UserInfoList from '@/app/(client)/my-page/components/user-info-list';

type UserPhysicalInfoCardProps = {
  userInfo: UserDTO;
};

const GENDER_OPTIONS_IN_PROFILE = {
  ...GENDER_OPTIONS,
  NOT_SET: '미설정'
};

const ACTIVITY_LEVEL_OPTIONS_IN_PROFILE = {
  ...ACTIVITY_LEVEL_OPTIONS,
  NOT_SET: {
    description: '미설정',
    factor: 0
  }
};

const UserPhysicalInfoCard = ({ userInfo }: UserPhysicalInfoCardProps) => {
  const {
    gender = 'NOT_SET',
    height = 'NOT_SET',
    weight = 'NOT_SET',
    activityLevel = 'NOT_SET'
  } = userInfo.personalInfo ?? {};

  return (
    <Accordion type="single" collapsible className="rounded-2xl bg-white px-4 py-4">
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-1 py-[0.56rem]">
          <Typography as="h3" variant="subTitle2">
            신체 정보
          </Typography>
        </AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-3 border-t-[1px] border-gray-200 pb-1 pt-5">
          <UserInfoList
            title="성별"
            description={gender === 'NOT_SET' ? '미설정' : GENDER_OPTIONS_IN_PROFILE[gender]}
          />
          <UserInfoList title="키" description={height === 'NOT_SET' ? '미설정' : `${height}cm`} />
          <UserInfoList title="몸무게" description={weight === 'NOT_SET' ? '미설정' : `${weight}kg`} />
          <UserInfoList title="활동 수준" description={ACTIVITY_LEVEL_OPTIONS_IN_PROFILE[activityLevel].description} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default UserPhysicalInfoCard;
