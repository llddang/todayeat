import { Typography } from '@/components/ui/typography';
import RecommedList from './recommed-list';

const ThirdSection = () => {
  return (
    <section className="w-full px-4 py-8 text-left">
      <Typography as="h3" variant="title3">
        이런 분들께 <br />
        투데잇을 추천해요
      </Typography>
      <ul className="mt-8">
        <RecommedList
          title={
            <>
              식단은 중요하다는 걸 알지만, <br />
              기록이 너무 귀찮았던 분
            </>
          }
          description={
            <>
              투데잇은 사진 한 장만 올리면 끝! <br />
              기록이 쉬우니까 꾸준히 할 수 있어요
            </>
          }
          image="bg-onboarding-recommend-1"
        />
        <RecommedList
          title={
            <>
              내가 잘 먹고 있는 건지 <br />
              항상 궁금했던 분
            </>
          }
          description={
            <>
              단순한 기록이 아니라 권장 칼로리와 <br />
              영양소에 맞게 잘 먹고 있는지 확인할 수 있어요
            </>
          }
          image="bg-onboarding-recommend-2"
        />
        <RecommedList
          title={
            <>
              다이어트나 운동 중인데, <br />
              식단에 대해 조언이 필요했던 분
            </>
          }
          description={
            <>
              감량부터 근육 증가까지 내 목표에 딱 맞는 <br />
              피드백을 받고 다음 식사를 설계할 수 있어요
            </>
          }
          image="bg-onboarding-recommend-3"
        />
      </ul>
    </section>
  );
};

export default ThirdSection;
