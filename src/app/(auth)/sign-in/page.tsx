import AuthSignInForm from '@/components/_auth/_sign-in/auth-sign-in-form';
import AuthSignInWithGoogleButton from '@/components/_auth/_sign-in/auth-sign-in-with-google-button';
import AuthSignInWithKakaoButton from '@/components/_auth/_sign-in/auth-sign-in-with-kakao-button';
import { Typography } from '@/components/ui/typography';
import Image from 'next/image';
import LOGO from '@/../public/logo.svg';

const SignInPage = () => {
  return (
    <section>
      <div className="gap flex flex-col items-center gap-2 px-4 pb-7 pt-2">
        <h2>
          <Image src={LOGO} alt="투데잇 로고" className="h-[38px] w-[137px]" />
        </h2>
        <Typography variant="body2" className="text-gray-700">
          사진 한 장으로 완성되는 식단 기록
        </Typography>
      </div>
      <section className="space-y-6 px-5 pb-8 pt-7">
        <h3 className="sr-only">로그인 폼</h3>
        <AuthSignInForm />
        <div className="flex flex-col gap-2">
          <AuthSignInWithKakaoButton />
          <AuthSignInWithGoogleButton />
        </div>
      </section>
    </section>
  );
};
export default SignInPage;
