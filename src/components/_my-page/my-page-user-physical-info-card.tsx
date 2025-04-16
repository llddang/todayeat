import { UserDTO } from '@/types/DTO/user.dto';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Typography } from '@/components/ui/typography';
import MyPageUserInfoList from '@/components/_my-page/my-page-user-info-list';
import { ACTIVITY_LEVEL_OPTIONS_IN_PROFILE, GENDER_OPTIONS_IN_PROFILE } from '@/constants/user-personal-info.constant';

type MyPageUserPhysicalInfoCardProps = {
  userInfo: UserDTO;
};
const MyPageUserPhysicalInfoCard = ({ userInfo }: MyPageUserPhysicalInfoCardProps) => {
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
          <MyPageUserInfoList
            title="성별"
            description={gender === 'NOT_SET' ? '미설정' : GENDER_OPTIONS_IN_PROFILE[gender]}
          />
          <MyPageUserInfoList title="키" description={height === 'NOT_SET' ? '미설정' : `${height}cm`} />
          <MyPageUserInfoList title="몸무게" description={weight === 'NOT_SET' ? '미설정' : `${weight}kg`} />
          <MyPageUserInfoList
            title="활동 수준"
            description={ACTIVITY_LEVEL_OPTIONS_IN_PROFILE[activityLevel].description}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MyPageUserPhysicalInfoCard;
