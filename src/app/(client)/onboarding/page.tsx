import { cookies } from 'next/headers';
import FirstSection from './components/first-section';
import SecondSection from './components/second-section';
import ThirdSection from './components/third-section';
import CtaCard from './components/cta-card';

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
    <section className="bg-onboarding-bg relative bg-[length:37.5rem_37.5rem] bg-[position:center_7.31rem] bg-no-repeat pt-8 text-center">
      <FirstSection setCookie={setOnboardedCookie} />
      <SecondSection />
      <ThirdSection />
      <CtaCard setCookie={setOnboardedCookie} />
    </section>
  );
};

export default OnboardingPage;
