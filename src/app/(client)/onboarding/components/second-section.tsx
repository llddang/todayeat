import { Typography } from '@/components/ui/typography';
import IntroduceList from './introduce-list';
import PostImage1 from '@/../public/images/onboarding-meal-post-1.png';
import PostImage2 from '@/../public/images/onboarding-meal-post-2.png';
import PostImage3 from '@/../public/images/onboarding-meal-post-3.png';

const SecondSection = () => {
  return (
    <section className="w-full px-4 py-8 text-left">
      <Typography as="h3" variant="title3">
        오늘의 식사를 <br />
        <span className="bg-gradient-to-r from-red-300 from-[0%] to-purple-200 to-[91%] bg-clip-text text-transparent">
          투데잇
        </span>
        이 분석해 드릴게요!
      </Typography>
      <ol className="mt-8 space-y-4">
        <IntroduceList
          order="01"
          description={
            <>
              오늘 먹은 음식 사진을 <br />
              투데잇에 올리면
            </>
          }
          image={PostImage1}
        />
        <IntroduceList
          order="02"
          description={
            <>
              AI가 음식 종류부터 칼로리, <br />
              영양소까지 똑똑하게 분석해주고
            </>
          }
          image={PostImage2}
        />
        <IntroduceList
          order="03"
          description={
            <>
              기록을 저장하면 내 목표에 <br />딱 맞는 피드백을 받을 수 있어요!
            </>
          }
          image={PostImage3}
        />
      </ol>
    </section>
  );
};

export default SecondSection;
