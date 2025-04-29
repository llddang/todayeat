import SignInForm from '@/app/(auth)/sign-in/components/sign-in-form';
import GoogleSignInButton from '@/app/(auth)/sign-in/components/google-sign-in-button';
import KakaoSignInButton from '@/app/(auth)/sign-in/components/kakao-sign-in-button';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import LOGO from '@/../public/logo.svg';
import Link from 'next/link';
import SITE_MAP from '@/constants/site-map.constant';
import GlassBackground from '@/components/commons/glass-background';
import AnonymousSignInButton from './components/anonymous-sign-in-button';

const SignInPage = () => {
  return (
    <section>
      <div className="gap flex flex-col items-center gap-2 px-4 pb-7 pt-2 xl:pt-0">
        <h2>
          <Link href={SITE_MAP.HOME}>
            <Image src={LOGO} alt="투데잇 로고" className="h-[38px] w-[137px]" />
          </Link>
        </h2>
        <Typography variant="body2" className="text-gray-700">
          사진 한 장으로 완성되는 식단 기록
        </Typography>
      </div>
      <GlassBackground className="min-h-0 space-y-6 rounded-[2rem] px-5 pb-8 pt-7 xl:p-10">
        <SignInForm />
        <div className="flex flex-col gap-2">
          <AnonymousSignInButton />
          <KakaoSignInButton />
          <GoogleSignInButton />
        </div>
      </GlassBackground>
    </section>
  );
};
export default SignInPage;
