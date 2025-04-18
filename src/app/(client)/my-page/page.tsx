import CtaExampleFeedbackBanner from '@/components/commons/cta-example-feedback-banner';
import GlassBackground from '@/components/commons/glass-background';
import { getUser } from '@/lib/apis/user.api';
import ProfileBar from './components/profile-bar';
import UserGoalCard from './components/user-goal-card';
import UserPhysicalInfoCard from './components/user-physical-info-card';
import SettingCard from './components/setting-card';

const MyPage = async () => {
  const userInfo = await getUser();

  return (
    <section>
      <h2 className="sr-only">마이페이지</h2>
      <ProfileBar />
      <GlassBackground className="min-h-auto space-y-4 rounded-[2rem]">
        {!userInfo.personalInfo && (
          <CtaExampleFeedbackBanner
            title="건강 목표가 아직 설정되지 않았어요"
            description="1일 목표 칼로리를 설정하고 식사를 기록하면 1일 권장 섭취량과 나에게 딱 맞는 식단 피드백을 받을 수 있어요!"
          />
        )}
        <UserGoalCard userInfo={userInfo} />
        <UserPhysicalInfoCard userInfo={userInfo} />
        <SettingCard />
      </GlassBackground>
    </section>
  );
};

export default MyPage;
