import { cookies } from 'next/headers';
import FirstSection from './_components/first-section';
import SecondSection from './_components/second-section';
import ThirdSection from './_components/third-section';
import CtaCard from './_components/cta-card';

const EXPIRED_COOKIE_ONE_YEAR = 60 * 60 * 24 * 365;
const setOnboardedCookie = async () => {
  'use server';
  const cookieStore = cookies();
  cookieStore.set('isOnboarded', 'true', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: EXPIRED_COOKIE_ONE_YEAR
  });
};

const OnboardingPage = () => {
  return (
    <section className="relative bg-onboarding-bg bg-[length:37.5rem_37.5rem] bg-[position:center_7.31rem] bg-no-repeat pt-8 text-center xl:bg-[length:41.25rem_41.25rem] xl:bg-[position:right_2.5rem] xl:pt-0">
      <FirstSection setCookie={setOnboardedCookie} />
      <SecondSection />
      <ThirdSection />
      <CtaCard setCookie={setOnboardedCookie} />
    </section>
  );
};

export default OnboardingPage;
